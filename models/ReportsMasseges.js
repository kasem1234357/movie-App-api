const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
    showName: {
      type: String,
      required: true,
    },
    showId: {
      type: String,
      required: true,
    },
    userMsg: {
      type: String,
      default: "",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ReportsMasseges", ReportSchema);
