const { addMovie, deleteMovie } = require("../controllers/movies");
const { getUserByID } = require("../controllers/user");
const User = require("../models/User");
const router = require("express").Router();
// get user data
router.get("/:userId",getUserByID);
// add movie
router.put("/:userId/addMovie",addMovie);
// delete movie
 router.put("/:userId/deleteMovie", deleteMovie);
module.exports = router;
