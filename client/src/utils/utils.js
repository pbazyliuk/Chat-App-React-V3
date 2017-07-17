import io from 'socket.io-client';
export { sendMessage, initConnection, addListener, socket };

let socket;
const listeners = {};

function initConnection(message) {
	if (!socket) {
		console.error('New Socket');
		connect();
	}

	if (message) {
		send(message);
	}
}

function connect() {
	console.log('ws connect');
	socket = io('http://localhost:8090');
	socket.on('connect', function() {
		socket
			.on('authenticated', function() {
				console.log('authenticated client');
			})
			.emit('authenticate', { token: localStorage.getItem('token') })
			.on('join', function(val) {
				console.log('join', val.user);
				console.log(socket);
				onJoin(val.user);
			});

		socket.on('message', onMessage);
		// socket.on('join', onJoin);
		socket.on('leave', onLeave);
	});
}

function onMessage(msg) {
	fireListeners('message', msg);
}

function onJoin(username) {
	console.log('onJoin utils method ===', username);
	fireListeners('join', username);
}

function onLeave(username) {
	console.log('onLeave');
	fireListeners('leave', username);
}

function send(message) {
	socket.emit('message', message);
}

function sendMessage(message) {
	initConnection(message);
}

function fireListeners(event, payload) {
	if (listeners[event]) {
		[...listeners[event]].forEach(listener => listener(payload));
	}
}

function addListener(event, listener) {
	if (!listeners[event]) {
		listeners[event] = [];
	}
	listeners[event].push(listener);
}
