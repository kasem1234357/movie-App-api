const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
   const checkEmail = await User.findOne({ email: req.body.email });
   const checkName = await User.findOne({userName:req.body.userName});
 try {
   //generate new password
   if(checkEmail ){
    res.status(401).json("email is taken")
   }
   else if(checkName){
    res.status(402).json("name is taken")
   }
   else{
     
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
   }
  //  console.log(checkEmail)
   //create new user
   
 } catch (err) {
   
   res.status(500).json("err"+err)
 }
});

//LOGIN
 router.post("/login", async (req, res) => {
  
 
 try {
  const user = await User.findOne({ email: req.body.email });
  let validPassword = ""
  if(user){
    validPassword = await bcrypt.compare(req.body.password, user.password)
  }
  console.log(!user)
  console.log(validPassword)
  if(!user){ res.status(400).json("user not found");}
  else if(!validPassword || undefined){
  res.status(400).json("wrong password")
  }
  else{
    res.status(200).json(user)
  }
   
 } catch (err) {
  
   res.status(404).send('no user exists in db to update')
 }
});

module.exports = router;
