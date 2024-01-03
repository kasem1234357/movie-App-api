const{ SET_VERIFIED_EMAIL_MASSEGE } = require('./CONSTANTS')
const  handleError =require("./errorHandeler");
const sendToEmail = require("./sendToEmail");

const checkVerified = async(res,code,token,user)=>{
    try {
      if(code === token ){
        await user.updateOne({ $set: { verified: true } })
        res.status(200).json({ success: true, message: 'verified successfully!' });
        sendToEmail(user.userName,user.email,SET_VERIFIED_EMAIL_MASSEGE())
      }else{
        return handleError(res, 403, "your code is wrong ")
      }
    } catch (error) {
      return handleError(res, 500, "some thing going wrong ")
    }
  
  }
module.exports = checkVerified