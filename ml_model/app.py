from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model_path = 'models/bert-job-classifier'
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)

# Set the model to evaluation mode
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# Applied: You have send an application to a job posting
# Screening: When the HR is looking through your application or you have a task to complete
# Interview: Company has invited you to an interview
# Offer: Company has given you a job offer
# Rejected: Company no longer is looking at your application or you don't fit the criteria

labels = ["applied", "screening", "interview", "offer", "rejected", "ads", "other"]

def classify_email(text):
    inputs = tokenizer(text, return_tensors='pt', padding='max_length', truncation=True, max_length=128)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
    print(predicted_class)
    return labels[predicted_class]

@app.route('/classify', methods=['POST'])
def classify():
    data = request.json
    print(data)
    email_text = data['text']
    prediction = classify_email(email_text)
    return jsonify({'classification': prediction})

if __name__ == '__main__':
    app.run(port=4000)
