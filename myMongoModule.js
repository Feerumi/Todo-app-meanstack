var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var ip = process.env.IP;
var port = process.env.PORT;
var url = "mongodb://"+ ip + ":27017/test";

//TODO do ObjectID creator function.


// GET 
// checkout this for getting specific elements
// http://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection
// also this link for using ObjectID as a reference to objects
// https://www.tutorialspoint.com/mongodb/mongodb_relationships.htm
function fetchFromDatabase(collectionName, query, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			console.error("Error retrieving data from the database!");
			throw err;
		}

		var collection = db.collection(collectionName);
		collection.find(query).toArray(function(err, documents) {
			
			callback(err, documents);

			db.close();
		});
	});
}

// PUT
function updateDocument(query, data, collectionName, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			console.error("Error updating data in the database!");
			throw err;
		}

		var collection = db.collection(collectionName);

		collection.update(query, data, function(err, result) {
			callback(err, result);

			db.close();
		});
	});
}

// DELETE
function removeFromDatabase(query, collectionName, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			console.error("Error removing data from the database!");
			throw err;
		}
		console.log(query);
		var collection = db.collection(collectionName);
		collection.remove(query, function(err, result) {
			callback(err, result);

			db.close();
		});
	});
}

// POST
function addToDatabase(newDocument, collectionName, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			console.error("Error adding data to the database!");
			throw err;
		}
		console.log(newDocument);
		var collection = db.collection(collectionName);
		collection.insert(newDocument, function(err, result) {
			callback(err, result);

			db.close();
		});
	});
}

function addToCollection(newDocument, collectionName, callback) {
	mongoClient.connect(url, function(err, db) {
		if (err) {
			console.error("Error adding data to the database!");
			throw err;
		}
		var collection = db.collection(collectionName);
		collection.updateOne(newDocument, function(err, result) {
			callback(err, result);

			db.close();
		});
	});
}

exports.addToDatabase = addToDatabase;
exports.fetchFromDatabase = fetchFromDatabase;
exports.updateDocument = updateDocument;
exports.removeFromDatabase = removeFromDatabase;