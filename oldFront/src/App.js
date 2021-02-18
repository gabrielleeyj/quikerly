import "./App.css";
import React, { useState } from "react";
import LandingPage from "./components/WelcomeView/LandingPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUp from "./components/WelcomeView/SignUp";
import SignIn from "./components/WelcomeView/SignIn";
import ForgotPassword from "./components/WelcomeView/ForgotPassword";
import Dashboard from "./components/DashboardView/Dashboard";
import Customers from "./components/DashboardView/Customers";
import Orders from "./components/DashboardView/Orders";
import Profile from "./components/ProfileView/Profile";
import fire from "./firebase/Config";
// import {
// 	FirebaseAuthProvider,
// 	FirebaseAuthConsumer,
// } from "@react-firebase/auth";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	fire.auth().onAuthStateChanged((user) => {
		return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
	});

	console.log("logged in?", isLoggedIn);

	return (
		<div className="App">
			<Router>
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
						</Switch>
					</>
				) : (
					<>
						<Link to="/dashboard" component={Dashboard} />
						<Switch>
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/orders" component={Orders} />
							<Route path="/customers" component={Customers} />
							<Route path="/profile:id" component={Profile} />
						</Switch>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
