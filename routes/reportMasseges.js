const router = require("express").Router();
const Reports = require("../models/ReportsMasseges");
const User = require("../models/User");

// Report states
const REPORT_STATES = {
  NOT_READ: 1,
  IN_PROGRESS: 2,
  FIXED: 3,
};

// Create a reusable function to handle errors
const handleError = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

router.post('/', async (req, res) => {
  try {
    // Destructure request body
    const { userId, ...reportData } = req.body;

    // Create a new Reports instance
    const newReport = new Reports(reportData);

    // Save the new report
    const report = await newReport.save();

    // Find the user by ID
    const user = await User.findById(userId);

    // If the user doesn't exist, return an error
    if (!user) {
      return handleError(res, 401, "User not found");
    }

    // Create an object for report messages with initial state
    const reportMessage = {
      massege: report._id,
      state: REPORT_STATES.NOT_READ,
    };

    // Push the report message to the user's reportMessages array
    await user.updateOne({ $push: { reportMessages: reportMessage } });

    // Return the report as a response
    res.status(200).json(report);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

module.exports = router;
