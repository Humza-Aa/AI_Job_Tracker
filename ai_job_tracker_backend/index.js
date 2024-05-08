const express = require("express");
const app = express();
const port = 3000;
const { google } = require("googleapis");
app.use(express.json());
require("dotenv").config();
const checkIfSheetExists = require("./Functions/checkIfSheetExists");
const createSheet = require("./Functions/createSheet");

app.post("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "Creds/credentials.json",
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
  const month = today.toLocaleString("default", { month: "short" });
  const year = today.getFullYear();
  const sheetName = `${month}${year}`;

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
    pre_InterviewTasks,
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
      pre_InterviewTasks,
      jobDescription,
      additionalInformation,
    ],
  ];

  try {
    const sheetExists = await checkIfSheetExists(
      sheetName,
      sheet,
      spreadsheetId
    );
    console.log(sheetExists)
    if (!sheetExists) {
      // If the sheet tab doesn't exist, create it
      await createSheet(sheetName, sheet, spreadsheetId);
      // Add headings to the first row
      const headings = [
        [
          "Position Title",
          "Company",
          "Location",
          "Experience Level",
          "Applied Date",
          "Delete Deadline",
          "Status",
          "Pre-Interview Tasks",
          "Job Description",
          "Additional Information",
        ],
      ];
      await sheet.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:J1`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: headings,
        },
      });
    }

    await sheet.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:J`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    // console.error("Error appending to Google Sheet:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
