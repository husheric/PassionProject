const db = require("./index")
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function createUser(req, res, next) {
	const { full_name, email } = req.body;
  const hash = authHelpers.createHash(req.body.password);
  db
    .one(
      "INSERT INTO users (password_digest, full_name, email ) VALUES (${password}, ${full_name}, ${email} ) RETURNING id, full_name, email", {
      	password: hash,
      	full_name,
      	email
      }
    )
    .then(data => {
	    res.status(200).json({
	      status: "sucess",
	      data: data,
	      message: "fetched all markers"
	    })
	  })
    .catch(err => {
      console.log(err);
      res.status(500).send("error creating user");
    });
}

const getMarkers = (req, res, next) => {
	 db
	  .any("SELECT * FROM markers WHERE active=true")
	  .then(data => {
	    res.status(200).json({
	      status: "sucess",
	      data: data,
	      message: "fetched all markers"
	    })
	  })
	  .catch(err => {
	    next(err)
	  })
}

const insertMarkerPositive = (req, res, next) => {
	const { user_id, marker_id } = req.body;
	db
		.none("INSERT INTO positive (user_id, marker_id) VALUES (${user_id}, ${marker_id})", {
			user_id,
			marker_id
		})
		.then(() => {
			res.status(200).send("positive vote inserted")
		})
		.catch(err => {
			next(err)
		})
}

const insertMarkerNegative = (req, res, next) => {
	const { user_id, marker_id } = req.body;
	db
		.none("INSERT INTO negative (user_id, marker_id) VALUES (${user_id}, ${marker_id})", {
			user_id,
			marker_id
		})
		.then(() => {
			res.status(200).send("negative vote inserted")
		})
		.catch(err => {
			next(err)
		})	
}

const getMarkerPositive = (req, res, next) => {
	db
		.any("SELECT COUNT(*) FROM positive WHERE marker_id=${marker_id}", {
			marker_id: req.params.marker_id
		})
		.then(data => {
			res.status(200).json({
				status: 'success',
				data,
				message: 'fetched total marker positive'
			})
		})
		.catch(err => {
			next(err)
		})
}

const getMarkerNegative = (req, res, next) => {
	db
		.any("SELECT COUNT(*) FROM negative WHERE marker_id=${marker_id}", {
			marker_id: req.params.marker_id
		})
		.then(data => {
			res.status(200).json({
				status: 'success',
				data,
				message: 'fetched total marker negative'
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
	      status: "sucess",
	      data,
	      message: "fetched all markers"
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
	insertMarkerPositive,
	insertMarkerNegative,
	getMarkerPositive,
	getMarkerNegative,
	insertNewMarker
}