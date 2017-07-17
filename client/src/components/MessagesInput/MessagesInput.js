import React from 'react';

import * as ws from '../../utils/utils';

import styles from './MessagesInput.scss';

class MessagesInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		ws.sendMessage(this.state.message);
		this.clearForm();
	}

	clearForm() {
		this.setState({ message: '' });
	}

	handleChange(e) {
		const { value: message } = e.target;

		this.setState({ message });
	}

	render() {
		return (
			<div className={styles['message-input-container']}>
				<form action="" onSubmit={this.handleSubmit}>
					<input
						value={this.state.message}
						onChange={this.handleChange}
						className={styles['message-input']}
						placeholder="Input your message"
					/>
					<button className={styles['message-btn-submit']}>Send</button>
				</form>
			</div>
		);
	}
}

export default MessagesInput;
