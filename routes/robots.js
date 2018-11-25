// Example Route with CRUD (Create, Read, Use, Destroy)
// ================================================================================================ //


module.exports = function(app, router, db){

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

}