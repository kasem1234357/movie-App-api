const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
    {
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"moviesUsers",
            required:true
        },
        token:{
            type: String,
            required:true
        }
    }
);
const Token = mongoose.model('token',tokenSchema);
module.exports =Token