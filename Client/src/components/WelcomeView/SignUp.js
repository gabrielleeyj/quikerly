import withRoot from "./withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Form, FormSpy } from "react-final-form";
import Typography from "./components/Typography";
import AppAppBar from "./views/AppAppBar";
import AppForm from "./views/AppForm";
import FormButton from "./form/FormButton";
import FormFeedback from "./form/FormFeedback";
import { Link } from 'react-router-dom'
import { signUp } from "../../Store/actions/authActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: theme.spacing(6),
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	feedback: {
		marginTop: theme.spacing(2),
	},
}));

const SignUp = (props) => {
	const classes = useStyles();
	const [userData, setUserData] = React.useState({
		userName: '',
		userEmail: '',
		userContact: '',
		userPostalCode: '',
		userPassword: '',
		userAddress: '',
		userType: 'user'
	})
	const [sent, setSent] = React.useState(false);
	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value
		});
	};
	const handleSubmit = () => {
		const arr = Object.values(userData)
		let formFilled = true;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].length < 1) {
				formFilled = false;
			}
		}
		if (!formFilled) alert('Form not filled')
		if (formFilled) props.signup(userData)
	};

	return (
		<React.Fragment>
			<AppAppBar />
			<AppForm>
				<React.Fragment>
					<Typography variant="h3" gutterBottom marked="center" align="center">
						Sign Up
					</Typography>
					<Typography variant="body2" align="center">
						<Link to="/sign-in" style={{ textDecoration: 'underline' }}>
							Already have an account?
						</Link>
					</Typography>
				</React.Fragment>
				<Form
					onSubmit={() => handleSubmit()}
					subscription={{ submitting: true }}
					noValidate
				>
					{({ handleSubmit, submitting }) => (
						<form onSubmit={handleSubmit} className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										onChange={handleChange}
										label="Full Name"
										name="userName"
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleChange}
										fullWidth
										label="Contact"
										name="userContact"
										required
									/>
								</Grid>
							</Grid>
							<TextField
								onChange={handleChange}
								fullWidth
								label="Email"
								margin="normal"
								name="userEmail"
								required
							/>
							<TextField
								fullWidth
								label="Postal Code"
								onChange={handleChange}
								margin="normal"
								name="userPostalCode"
								required
							/>
							<TextField
								autoComplete="address"
								fullWidth
								onChange={handleChange}
								label="Address"
								margin="normal"
								name="userAddress"
								required
							/>
							<TextField
								fullWidth
								required
								name="userPassword"
								onChange={handleChange}
								label="Password min.length 6"
								type="password"
								margin="normal"
							/>
							<FormSpy subscription={{ submitError: true }}>
								{({ submitError }) =>
									submitError ? (
										<FormFeedback className={classes.feedback} error>
											{submitError}
										</FormFeedback>
									) : null
								}
							</FormSpy>
							<FormButton
								className={classes.button}
								color="secondary"
								fullWidth
								type='submit'
							>
								{submitting || sent ? "In progress…" : "Sign Up"}
							</FormButton>
						</form>
					)}
				</Form>
			</AppForm>
		</React.Fragment>
	);
}


const mapDispatchToProps = (dispatch) => {
	return {
		signup: (data) => dispatch(signUp(data))
	}
}

export default connect(null, mapDispatchToProps)(withRoot(SignUp));
