import React from 'react';
import Message from '../Message/Message';

import { connect } from 'react-redux';

import * as actions from '../../actions/index';

import MESSAGES from '../../data/messages.js';
import PropTypes from 'prop-types';

import styles from './MessagesList.scss';

class MessagesList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const arr = [1, 2, 3];
		console.log(this.props.messages);
		return (
			<div>
				<ul className={styles['message-list']}>
					{arr.map(item => {
						return (
							<li>
								{item}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

MessagesList.propTypes = {
	id: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	return { messages: state.applicationState.storeData.messages };
};

export default connect(mapStateToProps, actions)(MessagesList);
