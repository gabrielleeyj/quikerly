import "./App.css";
import React, { useState } from "react";
import LandingPage from "./components/WelcomeView/LandingPage";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SignUp from "./components/WelcomeView/SignUp";
import SignIn from "./components/WelcomeView/SignIn";
import ForgotPassword from "./components/WelcomeView/ForgotPassword";
import Dashboard from "./components/DashboardView/Dashboard";
import Account from "./components/account/AccountView";
import Customers from './components/customer/CustomerListView'
import OrdersView from './components/OrdersView/OrdersView'
import firebase from './Firebase/Config';
import { connect } from "react-redux";

function App(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	firebase.auth().onAuthStateChanged((user) => {
		user ? setIsLoggedIn(true) : setIsLoggedIn(false);
	})
	return (
		<div className="App">
			{!isLoggedIn ? (
				<>
					<Switch>
						<Route
							exact
							from="/"
							render={(props) => <LandingPage {...props} />}
						/>
						<Route
							exact
							path="/sign-up"
							render={(props) => <SignUp {...props} />}
						/>
						<Route
							exact
							path="/sign-in"
							render={(props) => <SignIn {...props} />}
						/>
						<Route
							exact
							path="/forgot-password"
							render={(props) => <ForgotPassword {...props} />}
						/>
						<Redirect from='/' to='/' />
					</Switch>
				</>
			) : (
					<>
						{isLoggedIn && <Switch>
							<Route exact path='/dashboard' component={Dashboard} />
							<Route exact path='/orders' component={OrdersView} />
							<Route exact path='/profile' component={Account} />
							{props.userType === 'admin' && <Route exact path='/customers' render={() => <Customers />} />}
							<Redirect from='/' to='/dashboard' />
						</Switch>}
					</>
				)}
		</div>
	);
}

const mapStateToProps = (state) => {
	const type = state.auth.userData;
	return {
		userType: type ? type.userType : null
	}
}

export default connect(mapStateToProps, null)(App);
