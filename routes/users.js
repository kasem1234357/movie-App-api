const User = require("../models/User");
const router = require("express").Router();
router.get("/:userId", async (req, res) => {
 const userId = req.params.userId;
 const userName = req.query.userName;
 try {
   const user = userId
     ? await User.findById(userId)
     : await User.findOne({ userName: userName });
   const { password, updatedAt, ...other } = user._doc;
   res.status(200).json(other);
 } catch (err) {
   res.status(500).json(err);
 }
});

router.put("/:userId/addMovie", async (req, res) => {
  const userId = req.params.userId;
  const movie = req.body.data;
  try {
    const user = await User.findById(userId)
    if(!user){
     res.status(401).json("there no userId like this");
    }else{
     
    await user.updateOne({ $push: { "favMovies": movie } });
     res.status(200).json(user);
    }
     
   } catch (err) {
     res.status(500).json(err);
   }
 });
 router.put("/:userId/deleteMovie", async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const movie = req.body;
    const user = await User.findById(userId)
   if(!user){
    res.status(401).json("there no userId like this");
   }else{
   await user.updateOne({ $pull: { favMovies: movie } });
    res.status(200).json("done");
   }
    
  } catch (err) {
    res.status(500).json(err);
  }
 });
module.exports = router;