var express = require('express');
var router = express.Router();
let db = require('../db/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getMarkers', db.getMarkers);

router.get('/getUsers', db.getUsers);

module.exports = router;
