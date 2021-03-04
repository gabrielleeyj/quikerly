import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import firebase from "../../../Firebase/Config";
import { updateProfile } from "../../../Store/actions/authActions";
import { connect } from "react-redux";

const ProfileDetails = ({ className, user, updateProfile, ...rest }) => {
	const [values, setValues] = useState({
		userName: user.userName,
		userEmail: user.userEmail,
		userContact: user.userContact ? user.userContact : "",
		userAddress: user.userAddress ? user.userAddress : "",
		userPostalCode: user.userPostalCode ? user.userPostalCode : "",
		userType: user.userType,
		photo: user.photo ? user.photo : null,
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const arr = Object.values(values);
		let formFilled = true;
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i].length < 1) {
				formFilled = false;
			}
		}
		if (!formFilled) {
			alert("Form not filled");
		}
		if (formFilled) {
			updateProfile(values);
		}
	};
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const setPassword = (email) => {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<form
			autoComplete="off"
			noValidate
			onSubmit={(e) => handleSubmit(e)}
			{...rest}
		>
			<Card>
				<CardHeader
					subheader="Please make sure this form is filled"
					title="Profile"
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Name"
								name="name"
								required
								value={values.userName}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Contact"
								name="userContact"
								defaultValue={values.userContact}
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>

						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label="Email"
								name="userEmail"
								required
								value={values.userEmail}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={8} xs={8}>
							<TextField
								fullWidth
								label="Address"
								name="userAddress"
								defaultValue={values.userAddress}
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<TextField
								fullWidth
								label="PostalCode"
								name="userPostalCode"
								onChange={handleChange}
								defaultValue={values.userPostalCode}
								required
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="space-between" p={2}>
					<Button
						color="primary"
						variant="contained"
						onClick={() => setPassword(user.userEmail)}
					>
						Reset Password
					</Button>
					<Button color="primary" variant="contained" type="submit">
						Save details
					</Button>
				</Box>
				<Box display="flex" justifyContent="center" p={2}>
					<Typography color="primary" variant="caption">
						Reset password with email & update profile with save details
					</Typography>
				</Box>
			</Card>
		</form>
	);
};

ProfileDetails.propTypes = {
	className: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateProfile: (data) => dispatch(updateProfile(data)),
	};
};

export default connect(null, mapDispatchToProps)(ProfileDetails);
