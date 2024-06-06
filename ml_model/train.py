import pandas as pd
import torch
from torch.utils.data import DataLoader, TensorDataset, random_split
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_scheduler
from tqdm.auto import tqdm

# Sample dataset
data = {
    'text': [
        "Thank you for applying.",
        "We would like to invite you for an interview.",
        "Congratulations, you have an offer!",
        "We are screening applications.",
        "We regret to inform you that you have been rejected."
    ],
    'label': [0, 2, 3, 1, 4]
}
df = pd.DataFrame(data)

# Load tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=5)

# Tokenization function
def tokenize_function(text):
    return tokenizer(text, padding='max_length', truncation=True, return_tensors="pt")

# Tokenize texts
tokenized_texts = df['text'].apply(tokenize_function)

# Prepare input tensors
input_ids = torch.cat([x['input_ids'] for x in tokenized_texts])
attention_masks = torch.cat([x['attention_mask'] for x in tokenized_texts])
labels = torch.tensor(df['label'].values)

# Create dataset and dataloaders
dataset = TensorDataset(input_ids, attention_masks, labels)
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

        outputs = model(input_ids, attention_mask=attention_masks, labels=labels)
        loss = outputs.loss
        loss.backward()

        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()
        progress_bar.update(1)

# Save the model
model.save_pretrained('ml_model/models/bert-job-classifier')
tokenizer.save_pretrained('ml_model/models/bert-job-classifier')

# Evaluation
model.eval()
accuracy = 0
for batch in val_dataloader:
    input_ids = batch[0].to(device)
    attention_masks = batch[1].to(device)
    labels = batch[2].to(device)

    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_masks, labels=labels)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)
    accuracy += (predictions == labels).sum().item()

accuracy = accuracy / len(val_dataset)
print(f'Validation Accuracy: {accuracy:.4f}')
