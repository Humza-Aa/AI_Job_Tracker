const express = require("express");
const app = express();
const port = 3000;
const { google } = require("googleapis");
app.use(express.json());
require("dotenv").config();

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

  const today = new Date();
  const appliedDate = today.toISOString().split("T")[0];

  // Calculate deleteDeadline as today's date plus 1 month
  const deleteDeadlineDate = new Date(today);
  deleteDeadlineDate.setMonth(deleteDeadlineDate.getMonth() + 1);
  const deleteDeadline = deleteDeadlineDate.toISOString().split("T")[0];

  const {
    positionTitle,
    company,
    location,
    experienceLevel,
    status,
    preInterviewTasks,
    jobDescription,
    additionalInformation,
  } = req.body;

  const validExperienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
  const validStatusOptions = [
    "Saved",
    "Applied",
    "Screening",
    "Interviewing",
    "Offer",
    "Rejected",
  ];

  if (
    !validExperienceLevels.includes(experienceLevel) ||
    !validStatusOptions.includes(status)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid experience level or status" });
  }

  const values = [
    [
      positionTitle,
      company,
      location,
      experienceLevel,
      appliedDate,
      deleteDeadline,
      status,
      preInterviewTasks,
      jobDescription,
      additionalInformation,
    ],
  ];

  try {
    await sheet.spreadsheets.values.append({
      spreadsheetId,
      range: "Apr2024!A:I",
      valueInputOption: "USER_ENTERED",
      resource: {
        values,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
