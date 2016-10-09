var http = require('http');
var path = require('path');
var express = require('express');
var mongo = require('./myMongoModule');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));


app.use(express.static('client'));

app.get(/todolists(\/)?/, function(req, res) {
    mongo.fetchFromDatabase("lists", {}, function(err, resultData) {
		if (err) {
			res.send(err);
		}
		res.json(resultData);
	});
});



// PUT / Update list with id
app.put('/todolists/:listid', function(req, res) {
	console.log("on put");
	mongo.updateDocument({listid: Number(req.params.listid)}, req.body, "lists", function(err, result) {
		if (err) {
			res.send(err);
		}
	});
});

// POST a new list
app.post(/todolists(\/)?/, function(req, res) {
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
app.delete('/todolists/:listid', function(req, res) {
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

app.get(/\/tasks(\/)?([0-9]+)?$/, function(req, res) {
    mongo.fetchFromDatabase("lists", {}, function(err, resultData) {
		if (err) {
			res.send(err);
		}
		res.json(resultData);
	});
});
;
// POST / Add new task
app.post('/tasks(\/)?$', function(req, res) {
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

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("todoserver listening at: ", addr.address + ":" + addr.port);
});