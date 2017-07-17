import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './UserItem.scss';

class UserItem extends React.Component {
	render() {
		const { id, firstname, createdAt } = this.props;

		// console.error(this.props);
		return (
			<Link to={`/chat/${id}`} className={styles['chat-list__link']}>
				<li className={styles['chat-list__item']}>
					<div className={styles['avatar']}>
						<img
							className={styles['avatar__img']}
							src="../../../images/user-off-avatar.png"
							alt="avatar-image"
						/>
					</div>
					<div className={styles['chat-info']}>
						<h4 className={styles['chat-name__heading']}>
							{firstname}
						</h4>
					</div>
					<div className={styles['chat-last-activity']}>
						{/*{createdAt}*/} 20:10
					</div>
				</li>
			</Link>
		);
	}
}

// ChatsItem.propTypes = {
//   chat: PropTypes.object.isRequired
// }

export default UserItem;
