const router = require("express").Router();
const { addReport, getReports } = require("../controllers/report");

// Report states




router.post('/',addReport );
router.get('/',getReports);

module.exports = router;
