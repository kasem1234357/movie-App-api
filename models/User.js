const mongoose = require('mongoose');
//privateMasseges:[{messagesId,state}],
//globalMasseges:[{messagesId,state}],
//reportMasseges:[{messagesId,state}]
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
  reportMasseges:{
    type:[],
    default: []
  },
  globalMessages: [
    { MassegeId:{
    type:mongoose.Schema.Types.ObjectId, ref: 'SysMassege' 
  },isOpened:{
    type:Boolean,
    default:false
  }}],
  privateMasseges:{
    type:[],
    default: []
  }
},
{ timestamps: true })
module.exports = mongoose.model("moviesUsers", UserSchema);