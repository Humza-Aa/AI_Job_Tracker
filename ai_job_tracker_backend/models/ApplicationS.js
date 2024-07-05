const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  positionTitle: String,
  company: String,
  location: String,
  experienceLevel: String,
  appliedDate: Date,
  deleteDeadline: Date,
  status: String,
  pre_InterviewTasks: String,
  jobDescription: String,
  additionalInformation: String,
});

const Application = mongoose.model("Applications", applicationSchema);

module.exports = Application;