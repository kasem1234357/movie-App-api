const router = require("express").Router();
const { addReport, getReports,removeReport } = require("../controllers/report");

// Report states




router.post('/',addReport );
router.get('/',getReports);
router.delete('/:id',removeReport);
router.put('/:id',updateReport);

module.exports = router;
