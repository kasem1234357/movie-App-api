const router = require("express").Router();
const { createUser, logUser } = require("../controllers/auth");
router.post("/register",createUser);

//LOGIN
router.post("/login", logUser);

module.exports = router;
