const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.post('/auth/login', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.login.toUpperCase() === req.body.login.toUpperCase();
			});

		if(!matchedUser) {
			res.status(401).send('Wrong username');
		} else if(matchedUser.password === req.body.password) {
			res.json({ token: matchedUser.fakeToken});
		} else {
			res.status(401).send("Wrong password");
		}
	});
		
	router.post('/auth/userinfo', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.fakeToken === req.body.token;//('Authorization');
			});
			
		if(!matchedUser) {
			res.status(401).send('Unauthorized');
		} else {
			res.json(matchedUser/*{
				id: matchedUser.id,
				token: matchedUser.fakeToken,
				name: {
					firstName: matchedUser.name.first,
					lastName: matchedUser.name.last
				},
				login: matchedUser.login,
				password: matchedUser.password
			}*/);
		}
	});

	router.get('/auth', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.fakeToken === req.header('Authorization');
			});

		if(!matchedUser) {
			res.json(false);
		} else {
			res.json(true);
		}
	});

	return router;
};
