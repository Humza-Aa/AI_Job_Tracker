import pandas as pd
import json

csv_df = pd.read_csv("./Email_Dataset/RejectionE.csv")

label_mapping = {
    'not_reject': 1,  
    'reject': 4      
}

csv_df['label'] = csv_df['Status'].map(label_mapping)

with open("./Email_Dataset/Emails.json") as f:
  json_data = json.load(f)

json_df = pd.DataFrame(json_data)

combined_df = pd.concat([json_df, csv_df], ignore_index=True)

print(combined_df)