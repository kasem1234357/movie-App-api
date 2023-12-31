const router = require("express").Router();

const { addPriveteMsg, addGlobalMsg } = require("../controllers/systemMsg");
// Private messages endpoint
router.post("/private",addPriveteMsg );

// Global messages endpoint
router.post("/global",addGlobalMsg );

module.exports = router;
