const db = require("./index")
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");


//user queries

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function createUser(req, res, next) {
	const { full_name, email, password, username } = req.body;
  const hash = authHelpers.createHash(req.body.password);
  db
    .one(
      "INSERT INTO users (password_digest, full_name, email, username) VALUES (${password}, ${full_name}, ${email}, ${username}) RETURNING id, full_name, email, username", {
      	password: hash,
      	full_name,
      	email,
      	username
      }
    )
    .then(data => {
	    res.status(200).json({
	      status: "success",
	      data: data,
	      message: "registered user"
	    })
	  })
    .catch(err => {
      console.log(err);
      res.status(500).send("error creating user");
    });
}

function loginUser(req, res, next) {
  passport.authenticate("local", {})
}


// map queries

const getMarkers = (req, res, next) => {
	 db
	  .any("SELECT * FROM markers")
	  .then(data => {
	    res.status(200).json({
	      status: "success",
	      data: data,
	      message: "fetched all markers"
	    })
	  })
	  .catch(err => {
	    next(err)
	  })
}

const insertNewMarker = (req, res, next) => {
	const { reported_by, category, description, latitude, longitude } = req.body;
	db
		.one('INSERT INTO markers (reported_by, category, description, latitude, longitude) VALUES (${reported_by}, ${category}, ${description}, ${latitude}, ${longitude}) RETURNING *', {
			reported_by, 
			category, 
			description, 
			latitude, 
			longitude
		})
		.then(data => {
	    res.status(200).json({
	      status: "success",
	      data,
	      message: "inserted new marker"
	    })
	  })
	  .catch(err => {
	    next(err)
	  })
}

const insertMarkerScorePlus = (req, res, next) => {
	const { reported_by, marker_id } = req.body;
	db
		.none('INSERT INTO markers_score_plus (reported_by, marker_id) VALUES (${reported_by}, ${marker_id})', {
			reported_by,
			marker_id,
		})
		.then(() => {
	    res.status(200).send("inserted marker score");
	  })
	  .catch(err => {
	    next(err)
	  })
}

const insertMarkerScoreMinus = (req, res, next) => {
	const { reported_by, marker_id } = req.body;
	db
		.none('INSERT INTO markers_score_minus (reported_by, marker_id) VALUES (${reported_by}, ${marker_id})', {
			reported_by,
			marker_id
		})
		.then(() => {
	    res.status(200).send("inserted marker score");
	  })
	  .catch(err => {
	    next(err)
	  })
}

const getMarkerScorePlus = (req, res, next) => {
	db
		.any('SELECT * FROM markers_score_plus WHERE marker_id=${marker_id} ORDER BY timestamp DESC', {
			marker_id: req.params.marker_id
		})
		.then(data => {
	    res.status(200).json({
	      status: "success",
	      data,
	      message: "fetched marker score"
	    })
	  })
	  .catch(err => {
	    next(err)
	  })
}

const getMarkerScoreMinus = (req, res, next) => {
	db
		.any('SELECT * FROM markers_score_minus WHERE marker_id=${marker_id} ORDER BY timestamp DESC', {
			marker_id: req.params.marker_id
		})
		.then(data => {
	    res.status(200).json({
	      status: "success",
	      data,
	      message: "fetched marker score"
	    })
	  })
	  .catch(err => {
	    next(err)
	  })
}


module.exports = {
	logoutUser,
	createUser,
	getMarkers,
	insertNewMarker,
	insertMarkerScorePlus,
	insertMarkerScoreMinus,
	getMarkerScorePlus,
	getMarkerScoreMinus
}