var express = require('express');
var router = express.Router();
var mongo = require('../myMongoModule');

router.get(/todolists(\/)?/, function(req, res) {
    mongo.fetchFromDatabase("users", {name: "Feerumi"}, function(err, resultData) {
		if (err) {
			res.send(err);
		}
		res.json(resultData);
	});
});



// PUT / Update list with id
router.put('/todolists/:listid', function(req, res) {
	console.log("on put");
	mongo.updateDocument({listid: Number(req.params.listid)}, req.body, "lists", function(err, result) {
		if (err) {
			res.send(err);
		}
	});
});

// POST a new list
router.post(/todolists(\/)?/, function(req, res) {
    console.log("on post");
    console.log(req.body);
    mongo.addToDatabase(req.body, "lists", function(err, result) {
		if (err) {
			res.send(err);
		}
		mongo.fetchFromDatabase("lists", {}, function(resultData) {
			res.json(resultData);
		});
	});
});

// DELETE a list
router.delete('/todolists/:listid', function(req, res) {
	console.log(req.params.listid);
	mongo.removeFromDatabase({listid: Number(req.params.listid)}, "lists", function(err, result) {
	    if(err) {
	    	res.send(err);
	    } else {
	    	mongo.fetchFromDatabase("lists", {}, function(resultData) {
	    		res.json(resultData);	
	    	});
	    }
	});
})

router.get(/\/tasks(\/)?([0-9]+)?$/, function(req, res) {
    mongo.fetchFromCollection("lists", {}, function(err, resultData) {
		if (err) {
			res.send(err);
		}
		res.json(resultData);
	});
});
;
// POST / Add new task
router.post('/tasks(\/)?$', function(req, res) {
	mongo.addToDatabase(req.body, "lists", function(err, result) {
		if (err) {
			res.send(err);
		}
		mongo.fetchFromDatabase("lists", {}, function(resultData) {
			res.json(resultData);
		});
	});
});

// DELETE task with id
router.delete('/tasks/:id', function(req, res) {
	mongo.removeFromDatabase(req.params.id, "lists", function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			mongo.fetchFromDatabase("lists", {}, function(resultData) {
				res.json(resultData);
			});
		}
	});
});

// PUT / Update task with id
router.put('/tasks/:id', function(req, res) {
	mongo.updateDocument(req.params.id, req.body, "lists", function(err, result) {
		if (err) {
			res.send(err);
		}
	});
});

router.get('/users', function(req, res) {
	mongo.fetchFromDatabase("users", {}, function(err, resultData) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(resultData);
		}
	});
});

// Add new user
router.post('/users/:_id', function(req, res) {
	mongo.addToDatabase(req.body, "users", function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send({
				success: true
			});
		}
	});
});

