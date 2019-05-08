var express = require('express');
var router = express.Router();

import HitCounter from "../classes/HitCounter"
import log from "../classes/Logger"
/* GET home page. */
router.get('/', function(req, res, next) {
	//log.info("observed call to /log ")
	HitCounter.incrementCount();
  	//res.send("Observed hit, count is  " + HitCounter.getCount() + " and date time is " + new Date())
  	res.end()
});


export default router
