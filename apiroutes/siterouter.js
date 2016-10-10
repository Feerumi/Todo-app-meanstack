var express = require('express');
var router = express.Router();
var mongoDB = require('../myMongoModule');



// Add a new user
router.get('/setup', function(req, res) {
	var nick = {
		name: 'Feerumi',
		password: 'password'
	}
	mongoDB.addToDatabase(nick, "users", function(err, result) {
		if (err) {
			res.send(err);
		}
		res.json({
			success: true
		});
	});
});