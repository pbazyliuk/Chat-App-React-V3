const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.login = function(req, res, next) {
	//User has already had thero email and password auth'd
	//We just need to give them a token
	// res.send({ token: tokenForUser(req.user)})

	User.findOne(
		{ email: req.user.email },
		{ _id: 1, firstname: 1, lastname: 1, email: 1 },
		function(err, curUser) {
			if (err) {
				return next(err);
			}

			if (curUser) {
				res.send({ token: tokenForUser(req.user), user: curUser });
			}
		}
	);
};

exports.register = function(req, res, next) {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;

	// res.send({ success: 'true'});

	//write validation for email and password

	if (!email || !password) {
		return res
			.status(422)
			.send({ error: 'You must provide valid email and password' });
	}

	//See if user with the given email exist
	User.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return next(err);
		}

		//If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		//if a user with email does not exist, create and save user record
		const user = new User({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password,
			isLogged: false
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}

			console.log(user);

			User.findOne(
				{ email: email },
				{ _id: 1, firstname: 1, lastname: 1, email: 1 },
				function(err, curUser) {
					if (err) {
						return next(err);
					}

					if (curUser) {
						// Respond to request indicating the user was created
						res.json({ token: tokenForUser(user), user: curUser });
					}
				}
			);
		});
	});
};

exports.getAllUsers = function(req, res, next) {
	User.find(
		{},
		{ _id: 1, firstname: 1, lastname: 1, email: 1, isLogged: 1 },
		function(err, users) {
			if (err) {
				return next(err);
			}

			if (users) {
				console.log(users);
				res.send(users);
			}
		}
	);
};
