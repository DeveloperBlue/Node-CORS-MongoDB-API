// server.js


// Project Init
const express 		= require('express');
const app 			= express();
const cors 			= require('cors');
const bodyParser 	= require('body-parser');
const mongoDB		= require('mongodb');


// Express Setup
// ================================================================================================ //

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

// Setup CORS Whitelisting

/*
const whitelist = [""];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			console.log("A connection was attemped not allowed by CORS [" + origin + "]");
		}
	}
}

app.use(cors(corsOptions));
*/


// MongoDB Setup
// ================================================================================================ //

const MongoClient = require("mongodb").MongoClient;
const mongoDB_url = process.env.MONGODB_URL;
var db;

MongoClient.connect(mongoDB_url, function(err, client){
	if (err){
		console.log("Error connecting to MongoDB database");
		return;
	}
	db = client.db(process.env.DATABASE_NAME);
})


// Routes for API
// ================================================================================================ //

var router = express.Router();

router.use(function(req, res, next){
	console.log("API was hit");
	if (db){
		next();
	} else {
		res.json({message: "Server error connecting to database."});
	}
	
})

router.get("/", function(req, res){
	res.json({message : "Successfully connection to API"});
})

router.route("/");

// Example Route with CRUD (Create, Read, Use, Destroy)
// ================================================================================================ //

/*

Sending requests with POSTMAN
https://www.getpostman.com/

Parameters are accessed through req.body[parameter]
They are sent in the body in 'x-www-form-urlencoded' format.

*/

router.route("/robots").get(function(req, res){

	console.log("GET request to robots route");

	db.collection("robots").find().toArray(function(err, result){
		if (err){
			res.status(400).json({message : "An error occured with the GET request.", error: err});
			return;
		}
		console.log(result);
		res.status(200).json({message : result});
	})


}).post(function(req, res){

	console.log("POST request to robots route");

	db.collection("robots").insertOne({
		_id 	: req.body.id, 
		name: req.body.name
	}, function(err, result){
		if (err){
			res.status(400).json({message : "An error occured with the POST request.", error: err});
			return;
		}
		res.status(200).json({message : "Successful POST to robots"});
	});


}).put(function(req, res){

	console.log("PUT request to robots route");

	var status = db.collection("robots").updateOne({
		// Item to Update Search Criteria
		_id : req.body.id
	}, {

		$set : {
			// Parameters to update
			name: req.body.name
		}

	}, { upsert: true }, function(err, result){
		if (err){
			res.status(400).json({message : "An error occured with the PUT request.", error: err});
			return;
		}
		res.status(200).json({message : "Successful PUT to robots"});
	});


}).delete(function(req, res){

	console.log("DELETE request to robots route");

	var status = db.collection("robots").deleteOne({
		_id: req.body.id
	}, function(err, result){

		if (err){
			res.status(400).json({message : "An error occured with the DELETE request.", error: err});
			return;
		}
		res.status(200).json({message : "Successful DELETE to robots"});

	});

})

app.use("/api", router);

const listener = app.listen(process.env.PORT, function() {
	console.log('Server is listening on port ' + listener.address().port);
});
