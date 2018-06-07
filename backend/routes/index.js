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

router.post('/insertMarkerScorePlus', db.insertMarkerScorePlus)

router.post('/insertMarkerScoreMinus', db.insertMarkerScoreMinus)

router.get('/getMarkerScorePlus/:marker_id', db.getMarkerScorePlus)

router.get('/getMarkerScoreMinus/:marker_id', db.getMarkerScoreMinus)

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    user: req.user,
    message: `${req.user.email} is logged in`
  });
  return;
});

router.post('/createUser', db.createUser)

module.exports = router;
