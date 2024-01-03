const router = require("express").Router();
const { createUser, logUser, setVerified, getVerified } = require("../controllers/auth");
router.post("/register",createUser);
router.post("/set-verified",setVerified)
router.get('/get-verified/:userId',getVerified)

//LOGIN
router.post("/login", logUser);

module.exports = router;
