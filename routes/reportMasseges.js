const router = require("express").Router();
const { addReport } = require("../controllers/report");

// Report states




router.post('/',addReport );

module.exports = router;
