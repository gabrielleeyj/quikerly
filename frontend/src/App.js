import "./App.css";
import LandingPage from "./components/WelcomeView/LandingPage";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/WelcomeView/SignUp';
import SignIn from './components/WelcomeView/SignIn';
import ForgotPassword from './components/WelcomeView/ForgotPassword'
// import config from "./components/Firebase/Config";
// import {
// 	FirebaseAuthProvider,
// 	FirebaseAuthConsumer,
// } from "@react-firebase/auth";

function App() {
	return (
		<div className="App">
			{/* <FirebaseAuthProvider {...config} firebase={firebase}>
				<FirebaseAuthConsumer>
					{({ isSignedIn }) => {
						if (isSignedIn === true) {
							return <Dashboard credentials={credentials} />;
						} else {
							return "Invalid User";
						}
					}}
				</FirebaseAuthConsumer>
			</FirebaseAuthProvider>*/} 
			<Router>
            <Switch>
                <Route exact from="/" render={props => <LandingPage {...props} />} />
                <Route exact path="/sign-up" render={props => <SignUp {...props} />} />
                <Route exact path="/sign-in" render={props => <SignIn {...props} />} />
				<Route exact path="/forgot-password" render={props => <ForgotPassword {...props} />} />
            </Switch>
            </Router>
			
		</div>
	);
}

export default App;
