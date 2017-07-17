import React from 'react';
import ChatsNavbar from '../ChatsNavbar/ChatsNavbar';
import UsersList from '../UsersList/UsersList';
import ChatsDetails from '../ChatsDetails/ChatsDetails';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import io from 'socket.io-client';

import styles from './Chats.scss';

// const ROOT_URL = 'http://localhost:8090';

class Chats extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isToggleOn: false,
			isMenuShown: false
		};

		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleMenuShow = this.handleMenuShow.bind(this);

		// this.socket = io(ROOT_URL);

		// this.socket.on('server event', function(data) {
		// 	console.log(data);
		// });
	}

	handleSizeChange() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));

		// this.socket.emit('client event', { value: 'message from client' });
	}

	handleMenuShow() {
		this.setState(prevState => ({
			isMenuShown: !prevState.isMenuShown
		}));
	}

	render() {
		const collapseWidth = {
			width: '108px',
			overflow: 'hidden'
		};

		const expandWidth = {
			width: 'calc(100% - 108px)'
		};

		return (
			<div className={styles['wrapper']}>
				<aside
					className={styles['aside-part']}
					style={this.state.isToggleOn ? collapseWidth : {}}
				>
					<ChatsNavbar
						onSizeChange={this.handleSizeChange}
						onMenuShow={this.handleMenuShow}
						data={this.state}
					/>
					<ChatsMenu data={this.state} />
					<UsersList data={this.state} />
				</aside>
				<div
					className={styles['main-part']}
					style={this.state.isToggleOn ? expandWidth : {}}
				>
					<ChatsDetails />
				</div>
			</div>
		);
	}
}

export default Chats;
