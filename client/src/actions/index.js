import axios from 'axios';
import { history } from '../history/history';

import * as ws from '../utils/utils';

import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	GET_ALL_USERS,
	JOIN_CHAT,
	SEND_MESSAGE,
	LEAVE_CHAT
} from '../actionsTypes/index.js';

const ROOT_URL = 'http://localhost:8090';

export function registerUser({ firstname, lastname, email, password }) {
	console.error('action register');
	return function(dispatch) {
		axios
			.post(`${ROOT_URL}/register`, { firstname, lastname, email, password })
			.then(response => {
				localStorage.setItem('token', response.data.token);
				dispatch({ type: AUTH_USER, payload: response.data.user });

				history.push('/chat');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch(authError('Bad Register Info'));
			});
	};
}

export function loginUser({ email, password }) {
	return function(dispatch) {
		// Submit email/password to the server
		axios
			.post(`${ROOT_URL}/login`, { email, password })
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);

				dispatch({ type: AUTH_USER, payload: response.data.user });

				// - redirect to the route '/chats'
				history.push('/chat');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function logoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	
	console.log('logout action', ws);

	return { type: UNAUTH_USER };
}

export function getAllUsers() {
	return function(dispatch) {
		// Submit email/password to the server
		console.error('get all user action', localStorage.getItem('token'));
		axios
			.get(`${ROOT_URL}/api/users`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem('token')
				}
			})
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				console.error('Get All Users Action', response.data);
				dispatch({ type: GET_ALL_USERS, payload: response.data });
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch(authError('Some problems occurs with users fetch action'));
			});
	};
}

export function sendMessage(msg) {
	return function(dispatch) {
		const { message, username } = msg;

		dispatch({
			type: SEND_MESSAGE,
			payload: {
				message: `${username} >> ${message}`
			}
		});
	};
}

export function joinChat(username) {
	console.log('join action');
	return function(dispatch) {
		dispatch({
			type: JOIN_CHAT,
			payload: `${username} joined to chat`
		});
	};
}

export function leaveChat(username) {
	console.log('leave action');
	return function(dispatch) {
		dispatch({
			type: LEAVE_CHAT,
			payload: `${username} left chat`
		});
	};
}
