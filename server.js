// server.js


// Project Init
const express 		= require('express');
const app 			= express();
const cors 			= require('cors');
const bodyParser 	= require('body-parser');
const mongoDB		= require('mongodb');

var router = express.Router();


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

MongoClient.connect(mongoDB_url).then(function(client){

	db = client.db(process.env.DATABASE_NAME);

	// Spawn off routes once we secure a connection to the database
	require("./routes")(app, router, db);

}).catch(function(err){

	console.log("Error connecting to MongoDB database");

	// <TODO>
	// Retry connection at interval

	client.close();

	return;

})

app.use("/api", router);

const listener = app.listen(process.env.PORT, function() {
	console.log('Server is listening on port ' + listener.address().port);
});
