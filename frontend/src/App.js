import "./App.css";
// import SignIn from "./components/LoginView/Login";
// <SignIn />
// import Dashboard from "./components/DashboardView/Dashboard";
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
			</FirebaseAuthProvider> */}
			<Dashboard />
		</div>
	);
}

export default App;
