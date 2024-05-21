const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");

router.post('/apply', jobsController.jobApply)
router.get('/getAppliedJobs', jobsController.appliedJobs)
router.put('/updateJob', jobsController.jobApply)

module.exports = router;