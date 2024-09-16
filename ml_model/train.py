import pandas as pd
import torch
from torch.utils.data import DataLoader, TensorDataset, random_split
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_scheduler
from tqdm.auto import tqdm

csv_df = pd.read_csv("./Email_Dataset/balanced_dataSet.csv")

emails = csv_df["Email"].tolist()
labels = csv_df["Label"].tolist()

# Load tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased', num_labels=7)

# Tokenization function
def tokenize_function(text):
    return tokenizer(text, padding='max_length', truncation=True, return_tensors="pt")


# Tokenize texts
tokenized_emails = [tokenize_function(email) for email in emails]

# Prepare input tensors
input_ids = torch.cat([x['input_ids'] for x in tokenized_emails])
attention_masks = torch.cat([x['attention_mask'] for x in tokenized_emails])
labels_tensor = torch.tensor(labels)

# Create dataset and dataloaders
dataset = TensorDataset(input_ids, attention_masks, labels_tensor)
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

train_dataloader = DataLoader(train_dataset, batch_size=8, shuffle=True)
val_dataloader = DataLoader(val_dataset, batch_size=8, shuffle=False)

# Training setup
optimizer = AdamW(model.parameters(), lr=5e-5)
num_epochs = 3
num_training_steps = num_epochs * len(train_dataloader)
lr_scheduler = get_scheduler(
    "linear",
    optimizer=optimizer,
    num_warmup_steps=0,
    num_training_steps=num_training_steps
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Training loop
progress_bar = tqdm(range(num_training_steps))

model.train()
for epoch in range(num_epochs):
    for batch in train_dataloader:
        input_ids = batch[0].to(device)
        attention_masks = batch[1].to(device)
        labels = batch[2].to(device)

        outputs = model(
            input_ids, attention_mask=attention_masks, labels=labels)
        loss = outputs.loss
        loss.backward()

        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()
        progress_bar.update(1)

# Save the model
model.save_pretrained('models/bert-job-classifier')
tokenizer.save_pretrained('models/bert-job-classifier')

# Evaluation
model.eval()
accuracy = 0
for batch in val_dataloader:
    input_ids = batch[0].to(device)
    attention_masks = batch[1].to(device)
    labels = batch[2].to(device)

    with torch.no_grad():
        outputs = model(
            input_ids, attention_mask=attention_masks, labels=labels)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)
    accuracy += (predictions == labels).sum().item()

accuracy = accuracy / len(val_dataset)
print(f'Validation Accuracy: {accuracy:.4f}')
