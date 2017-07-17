// Libs

//@flow
import React, { Component } from 'react';
import { Router } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { history } from '../history/history';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import * as actions from '../actions/index';

// import * as actionCreators from '../actions/index';

import App from '../components/App';
import WebSockets from './WebSockets';

import Navbar from '../components/Navbar/Navbar';

import Home from '../components/Home/Home';
import Chats from '../components/Chats/Chats';
// import Login from '../components/Login/Login';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import AuthContainer from './AuthContainer';
import Protected from '../components/Protected/Protected';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// const { dispatch, state } = this.props;
		// const defaultAction = bindActionCreators(actionCreators.defaultAction, dispatch);
		// console.error(this.props);
		return (
			<Router history={history}>
				{/*<App data={state} func={defaultAction}/> */}
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							path="/chat"
							render={() =>
								Protected(this.props, <Chats />, '/auth/login', true)}
						/>} />
						<Route path="/auth" component={AuthContainer} />
						<Route path="/:params" component={PageNotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({
	state: state
});

export default connect(mapStateToProps)(AppContainer);
