const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const Application = require("./models/ApplicationS");
const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "Jobs",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});


app.post("/", async (req, res) => {
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

  const currentDate = new Date();

  const torontoOffset = -4 * 60;
  const torontoTime = new Date(currentDate.getTime() + torontoOffset * 60000);

  const appliedDate = torontoTime;

  const deleteDeadline = new Date(torontoTime);
  deleteDeadline.setMonth(deleteDeadline.getMonth() + 1);

  const newApplication = new Application({
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
  });

  try {
    await newApplication.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error saving application to MongoDB:", error);
    res.sendStatus(500);
  }
});

app.get("/appliedJobs", async (req, res) => {
  console.log(req)
  try {
    const jobs = await Application.find();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
