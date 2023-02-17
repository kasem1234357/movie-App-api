const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  phone:{
    type:Number,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  favMovies: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true })
module.exports = mongoose.model("moviesUsers", UserSchema);