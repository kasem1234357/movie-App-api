const Token = require('../models/token')
const sendToEmail = require('../utils/sendToEmail')
const randomize = require('../utils/randomizeFn')
const checkVerified = require('../utils/checkVerifiedFn')
const {GET_VERIFIED_EMAIL_MASSEGE} = require('../utils/CONSTANTS')
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const handleError = require('../utils/errorHandeler')

const createUser = async (req, res) => {
  // توليد ملح لتحسين أمان التشفير
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // التحقق من تكرار البريد الإلكتروني واسم المستخدم
  const checkEmail = await User.findOne({ email: req.body.email });
  const checkName = await User.findOne({ userName: req.body.userName });

  try {
    // التحقق من تكرار البريد الإلكتروني واسم المستخدم
    if (checkEmail) {
      return handleError(res, 401, "email is taken");
    } else if (checkName) {
      return handleError(res, 401, "name is taken");
    } else {
      // إنشاء مستخدم جديد وحفظه في قاعدة البيانات
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    return handleError(res, 500, "error");
  }
};
const logUser = async (req, res) => {
  try {
    // البحث عن المستخدم باستخدام عنوان البريد الإلكتروني
    const user = await User.findOne({ email: req.body.email });
    let validPassword = "";
    if (user) {
      // التحقق من صحة كلمة المرور المدخلة
      validPassword = await bcrypt.compare(req.body.password, user.password);
    }

    if (!user) {
      return handleError(res, 401, "User not found");
    } else if (!validPassword || validPassword === undefined) {
      return handleError(res, 403, "Wrong password");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    return handleError(res, 404, "no user exists in db to update");
  }
};
const getVerified = async(req,res)=>{
  const userId = req.params.userId;
  try {
     if(!userId){
      return handleError(res, 401, "UserId not found")
     }else{
      const user = await User.findById(userId)
      if(!user){
        return handleError(res, 403, "User not found")
      }
       const currentToken = await Token.findOne({userID:userId})
       if(currentToken){
         await Token.findOneAndDelete({userID:userId})
       }
       const token = new Token({
        userID:userId,
        token:randomize(6)
       })
       const newToken = await token.save()
       sendToEmail(user.userName,user.email,GET_VERIFIED_EMAIL_MASSEGE(newToken.token))
       
     }
  } catch (error) {
    return handleError(res, 500, "some thing going wrong")
  }

}
const setVerified = async(req,res)=>{
  const { userId,code } = req.body;
  try {
    if(!userId){
      return handleError(res, 401, "User not found")
     }else{
      const user = await User.findById(userId)
      if(!user){
        return handleError(res, 403, "User not found")
      }
      const token = await Token.findOne({userID:userId});
      if(!token){
        return handleError(res, 403, "no token found ")
      }else{
        checkVerified(code,token.token,user)
      }
     }
  } catch (error) {
    return handleError(res, 500, "some thing going wrong ")
  }
}
module.exports = {
  createUser,logUser,getVerified,setVerified
}