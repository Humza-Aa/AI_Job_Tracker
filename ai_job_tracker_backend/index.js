const express = require("express");
const app = express();
const port = 3000;
const { google } = require("googleapis");

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const sheet = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = process.env.SPREADSHEETID;

  await sheet.spreadsheets.values.append({
    spreadsheetId,
    range: "Apr2024!A:I",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [],
    },
  });

  res.send(getRows.data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
