var express = require('express');
var router = express.Router();
let db = require('../db/queries');
const passport = require("../auth/local");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getMarkers', db.getMarkers);

router.post('/insertNewMarker', db.insertNewMarker)

router.post('/insertMarkerPositive', db.insertMarkerPositive)

router.post('/insertMarkerNegative', db.insertMarkerNegative)

router.get('/getMarkerPositive/:marker_id', db.getMarkerPositive)

router.get('/getMarkerNegative/:marker_id', db.getMarkerNegative)

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    user: req.user,
    message: `${req.user.email} is logged in`
  });
  return;
});

router.post('/createUser', db.createUser)

module.exports = router;
