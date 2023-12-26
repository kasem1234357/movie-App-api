const mongoose = require("mongoose");
const SystemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
      
    },
    textArea: {
      type: Object,
      required: true,
    },
    title:{
      type:String,
      require:true
    },
    isPrivate:{
        type:Boolean,
        default:false,
        require:true
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SystemMasseges", SystemSchema);
