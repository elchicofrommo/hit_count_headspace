var express = require('express');
var router = express.Router();

import logger from '../classes/Logger'
import counter from '../classes/HitCounter'

/* GET home page. */
router.get('/', function(req, res, next) {
	//logger.info("saw a request to root"	)
	counter.incrementCount()
  res.send('counter index page');
});

export default router
