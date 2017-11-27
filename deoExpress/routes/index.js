var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pants', { title: 'Pants' }),
  res.render('resteraunts', { title: 'Resteraunts' }),
  res.render('index', { title: 'Express' });
});

module.exports = router;
