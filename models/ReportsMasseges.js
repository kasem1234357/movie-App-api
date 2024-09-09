const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema(
  {
    problemType: {
      type: [],
      require: true,
    },
    type:{
      type:String,
      require:true
    },
    userId: {
      type: String,
      required: true,
    },
    date:{
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
    status:{
     type:String,
      enum:["not readed","in progress","done"],
      default:"not readed"
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReportsMasseges", ReportSchema);
