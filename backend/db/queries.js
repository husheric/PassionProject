const db = require("./index")

function getUsers(req, res, next) {
	db
		.any("SELECT * FROM users")
		.then(data => {
			res.status(200).json({
				status: "success",
				data: data,
				message: "fetched all users"
			})
		})
		.catch(err => {
			next(err)
		})
}

function getMarkers(req, res, next) {
	 db
	  .any("SELECT * FROM markers")
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

module.exports = {
	getUsers,
	getMarkers
}