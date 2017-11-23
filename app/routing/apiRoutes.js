var friends = require("./../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;
		var bestFriend = compatibility(newFriend);
		friends.push(newFriend);
		res.send(bestFriend);
	});
};

function compatibility(newFriend) {
	var leastDiff = 41;
	var mostCompatible;
	if (friends.length === 0) {
		console.log("You're the first friend finder! Wait until someone else also takes the survey to get matched up!");
	} else { 
		for (var i = 0; i < friends.length; i++) {
			var difference = 0;
			for (var x = 0; x < 10; x++) {
				difference += Math.abs(friends[i].scores[x] - newFriend.scores[x]);
			};
			if (difference < leastDiff) {
				leastDiff = difference;
				mostCompatible = i;
			};
		};
	};
	return friends[mostCompatible];
};