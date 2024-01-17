const { checkLink, addLink } = require("../controllers/moviesLinks");

const router = require("express").Router();
 router.post('/check',checkLink);
 router.post('/add',addLink);





module.exports = router;
