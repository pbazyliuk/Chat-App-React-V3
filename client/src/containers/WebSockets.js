import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

import * as ws from '../utils/utils';

class WebSockets extends React.Component {
	constructor(props) {
		super(props);

		this.ROOT_URL = 'http://localhost:8090';
	}

	componentWillReceiveProps({ user }) {
		if (user) {
			const { sendMessage, joinChat, leaveChat } = this.props;

			console.log(this.props);

			ws.initConnection();

			// ws.addListener('message', sendMessage);

			ws.addListener('join', joinChat);
			ws.addListener('leave', leaveChat);
		}
	}

	componentWillUnmount() {
		// TODO: add event for closing socket
		
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => {
	return { user: state.applicationState.uiState.user };
};

export default connect(mapStateToProps, actions)(WebSockets);

// export {
//   sendMessage,
//   initConnection,
//   addListener
// };

// let socket;
// const listeners = {};

// function initConnection(message) {
//   if (!socket) {
//     connect();
//   }

//   if (message) {
//     send(message);
//   }
// }

// function connect() {
//   socket = io('http://front-camp-chat.herokuapp.com/');

//   socket.on('message', onMessage);
//   socket.on('join', onJoin);
//   socket.on('leave', onLeave);
// }

// function onMessage(msg) {
//   fireListeners('message', msg);
// }

// function onJoin(username) {
//   fireListeners('join', username);
// }

// function onLeave(username) {
//   fireListeners('leave', username);
// }

// function send(message) {
//   socket.emit('message', message);
// }

// function sendMessage(message) {
//   initConnection(message);
// }

// function fireListeners(event, payload) {
//   if (listeners[event]) {
//     [...listeners[event]].forEach(listener => listener(payload));
//   }
// }

// function addListener(event, listener) {
//   if (!listeners[event]) {
//     listeners[event] = [];
//   }
//   listeners[event].push(listener);
// }
