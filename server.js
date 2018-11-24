// server.js

// init project
const express 		= require('express');
const app 			= express();
const cors 			= require('cors');
const bodyParser 	= require('body-parser');
const sql 			= require('mysql');



// Express Setup
// ================================================================================================ //

	// Setup CORS Whitelisting
const whitelist = ["https://developerblue.github.io", "https://secret-santa-sorter.glitch.me"];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			console.log("A connection was attemped not allowed by CORS [" + origin + "]");
		}
	}
}

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cors(corsOptions));


// SQL Setup
// ================================================================================================ //

/*
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'your-password',
	database : 'cloudprint'
});
*/


// Routes for API
// ================================================================================================ //

var router = express.Router();

router.use(function(req, res, next){
	console.log("API was hit");
	next();
})

router.get("/", function(req, res){
	res.json({message : "Successfully connection to API"});
})

router.route("/")

app.use("/api", router);

/*
	Routes
		
		Display
			Robots
			Leadership
			Resources
			Projects
			Sponsors
			Contact

		Account Management
			Login
			Register --> NodeMailer
			Verify
			Reset

		Account Service

			Name, OSIS, Holds, Permissions, Authentication Display

			Attendance
			Announcement
			Social Media
			Users & Holds

			Website Manager
				Robots
				Leadership
					People
					Season Groups and Ordering
					Roster
				Contacts
				Sponsors
				Resources
				Projects


			Webmail
				Archives
				Drafts
				Create --> NodeMailer

*/



const listener = app.listen(process.env.PORT, function() {
	console.log('Server is listening on port ' + listener.address().port);
});
