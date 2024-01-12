const router = require("express").Router();
const { send_siteMap} = require("../controllers/seo");


router.get('/site_map',send_siteMap);

module.exports = router;
