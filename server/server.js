//Main starting point
const express = require('express');
// import express from 'express';
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const User = require('./models/user');

const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
mongoose.connect('mongodb://localhost:chat-app/chat-app');

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//a comment

//Server Setup
const port = process.env.PORT || 8090;
const server = http.createServer(app);

const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');
const config = require('./config');

const secret = config.secret;

io
	.on(
		'connection',
		socketioJwt.authorize({
			secret: secret,
			callback: false
		})
	)
	.on('authenticated', socket => {
		console.log('connect');
		var obj = { isLogged: true };

		User.findOneAndUpdate({ _id: socket.decoded_token.sub }, obj, function(
			err,
			user
		) {
			io.emit(
				'join',
				{
					user: user.firstname,
					time: Date.now()
				},
				console.log('join', user.firstname)
			);
		});

		socket.on('disconnect', disconnectHandler);

		function disconnectHandler() {
			console.log('leave');
			socket.broadcast.emit('leave', 'username');
			// socket.disconnect(true);

			// var obj = { isLogged: false };
			// User.findOneAndUpdate({ _id: socket.decoded_token.sub }, obj, function(
			// 	err,
			// 	user
			// ) {
			// 	return io.emit(
			// 		'leave',
			// 		{
			// 			user: user.firstname,
			// 			time: Date.now()
			// 		},
			// 		console.log('leave', user.firstname)
			// 	);
			// });
		}
	});

// socket.emit('join', { name: 'username' });

// socket.on('message', msg => {
// 	io.emit('message', { message: msg, username });
// });

// socket.on('disconnect', () => {
// 	socket.broadcast.emit('leave', { good: 'bye' });
// });

// io.on('connection', function(socket) {
// 	socket.emit('join', { name: 'username' });

// 	socket.on('message', msg => {
// 		io.emit('message', { message: msg, username });
// 	});

// 	socket.on('disconnect', () => {
// 		socket.broadcast.emit('leave', { good: 'bye' });
// 	});
// });

// io
//   .on('connection', socket => {
//     const username = socket.handshake.user.get('username');

//     console.error('connection');
//     console.error('username', username);

//     socket.broadcast.emit('join', username);

//     socket.on('message', msg => {
//       io.emit('message', { message: msg, username });
//     });

//     socket.on('disconnect', () => {
//       socket.broadcast.emit('leave', username);
//     });
// });

server.listen(port);
console.log('server is listening on: ', port);
