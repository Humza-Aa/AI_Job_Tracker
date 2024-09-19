from nltk.corpus import stopwords
import re
import os
import pandas as pd
import torch
from torch.utils.data import DataLoader, TensorDataset, random_split
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_scheduler
from tqdm.auto import tqdm
from sklearn.feature_extraction.text import TfidfVectorizer
import torch.nn as nn


class BertWithTfidf(nn.Module):
    def __init__(self, bert_model_name, tfidf_feature_dim, num_labels):
        super(BertWithTfidf, self).__init__()
        self.bert = BertForSequenceClassification.from_pretrained(
            bert_model_name, num_labels=num_labels)
        self.fc_tfidf = nn.Linear(tfidf_feature_dim, 32)  # For TF-IDF features
        self.fc_combined = nn.Linear(
            self.bert.config.hidden_size + 32, num_labels)  # Combined output layer

    def forward(self, input_ids, attention_mask, tfidf_features):
        # Get BERT embeddings
        outputs = self.bert.bert(
            input_ids=input_ids, attention_mask=attention_mask)
        # Shape: [batch_size, hidden_size]
        bert_embedding = outputs.pooler_output

        # Process TF-IDF features
        tfidf_embedding = self.fc_tfidf(
            tfidf_features)  # Shape: [batch_size, 32]

        # Combine both embeddings
        # Shape: [batch_size, hidden_size + 32]
        combined = torch.cat((bert_embedding, tfidf_embedding), dim=1)

        # Final classification layer
        logits = self.fc_combined(combined)  # Shape: [batch_size, num_labels]

        return logits


# Load dataset
csv_df = pd.read_csv("./Email_Dataset/balanced_dataSet.csv")

# Clean emails (your cleaning function)
stop_words = set(stopwords.words('english'))


def clean_text(email):
    email = email.lower()
    email = re.sub(r'\W', ' ', email)
    email = ' '.join([word for word in email.split()
                     if word not in stop_words])
    return email


csv_df['Clean_Email'] = csv_df['Email'].apply(clean_text)

# Extract TF-IDF features
tfidf = TfidfVectorizer(ngram_range=(1, 2), max_features=1000)
tfidf_features = tfidf.fit_transform(
    csv_df['Clean_Email']).toarray()  # Convert sparse matrix to dense
tfidf_tensor = torch.tensor(tfidf_features, dtype=torch.float32)

# Tokenize using BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
tokenized_emails = [tokenizer(email, padding='max_length', truncation=True,
                              return_tensors="pt") for email in csv_df['Clean_Email']]

input_ids = torch.cat([x['input_ids'] for x in tokenized_emails])
attention_masks = torch.cat([x['attention_mask'] for x in tokenized_emails])
labels_tensor = torch.tensor(csv_df['Label'].tolist())

# Create dataset and dataloaders
dataset = TensorDataset(input_ids, attention_masks,
                        tfidf_tensor, labels_tensor)
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

train_dataloader = DataLoader(train_dataset, batch_size=8, shuffle=True)
val_dataloader = DataLoader(val_dataset, batch_size=8, shuffle=False)

# Initialize custom BERT model with TF-IDF features
model = BertWithTfidf('bert-base-uncased',
                      tfidf_feature_dim=tfidf_tensor.shape[1], num_labels=7)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Training setup
optimizer = AdamW(model.parameters(), lr=5e-5)
num_epochs = 3
num_training_steps = num_epochs * len(train_dataloader)
lr_scheduler = get_scheduler(
    "linear", optimizer=optimizer, num_warmup_steps=0, num_training_steps=num_training_steps
)

# Training loop
progress_bar = tqdm(range(num_training_steps))
model.train()

for epoch in range(num_epochs):
    for batch in train_dataloader:
        input_ids, attention_masks, tfidf_features, labels = [
            x.to(device) for x in batch]

        outputs = model(
            input_ids=input_ids, attention_mask=attention_masks, tfidf_features=tfidf_features)
        loss = nn.CrossEntropyLoss()(outputs, labels)
        loss.backward()

        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()
        progress_bar.update(1)

# Save model


def save_model(model, tokenizer, output_dir):
    # Save the tokenizer and the BERT part of the model
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Save BERT
    model.bert.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)

    # Save additional layers (fc_tfidf and fc_combined)
    torch.save({
        'fc_tfidf': model.fc_tfidf.state_dict(),
        'fc_combined': model.fc_combined.state_dict()
    }, os.path.join(output_dir, 'additional_layers.pth'))


# Save model and tokenizer
save_model(model, tokenizer, 'models/bert-tfidf-job-classifier')


def load_model(output_dir, tfidf_feature_dim, num_labels):
    # Load BERT model and tokenizer
    model = BertWithTfidf(
        'bert-base-uncased', tfidf_feature_dim=tfidf_feature_dim, num_labels=num_labels)
    model.bert = BertForSequenceClassification.from_pretrained(
        output_dir, num_labels=num_labels)
    tokenizer = BertTokenizer.from_pretrained(output_dir)

    # Load additional layers
    additional_layers_path = os.path.join(output_dir, 'additional_layers.pth')
    checkpoint = torch.load(additional_layers_path)
    model.fc_tfidf.load_state_dict(checkpoint['fc_tfidf'])
    model.fc_combined.load_state_dict(checkpoint['fc_combined'])

    return model, tokenizer

# Load the saved model and tokenizer
model, tokenizer = load_model(
    'models/bert-tfidf-job-classifier', tfidf_feature_dim=1000, num_labels=7)
model.to(device)

# Evaluation loop
model.eval()
accuracy = 0

for batch in val_dataloader:
    input_ids, attention_masks, tfidf_features, labels = [
        x.to(device) for x in batch]

    with torch.no_grad():
        outputs = model(
            input_ids=input_ids, attention_mask=attention_masks, tfidf_features=tfidf_features)
        predictions = torch.argmax(outputs, dim=-1)
        accuracy += (predictions == labels).sum().item()

accuracy = accuracy / len(val_dataset)
print(f'Validation Accuracy: {accuracy:.4f}')
