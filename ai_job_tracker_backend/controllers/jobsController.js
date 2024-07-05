const Application = require("../models/ApplicationS");

exports.jobApply = async (req, res) => {
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
  console.log(req.user);
  const userId = req.user._id;
  const newApplication = new Application({
    user: userId,
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
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error saving application to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.appliedJobs = async (req, res) => {
  const userId = req.user?._id;
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ error: "Unauthorized: User not authenticated" });
  }
  try {
    const jobs = await Application.find({ user: userId });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateJob = async (req, res) => {
  const id = req.body.id;
  const updatedValue = req.body.updateV;
  const field = req.body.field;

  try {
    await Application.findByIdAndUpdate(id, {
      $set: { [field]: updatedValue },
    });
    console.log("Updated Successfully");
    res
      .status(200)
      .json({ message: "Updated Successfully"});
  } catch (error) {
    console.log("Update Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
