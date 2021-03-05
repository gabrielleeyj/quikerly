import React, { useState, useStyles } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from "@material-ui/core";
import { getOrders, orderCreate } from "../../Store/actions/orderActions";
import { connect } from "react-redux";

const CreateOrder = (props) => {
	const originalState = {
		recipientPostalCode: "",
		recipientContact: "",
		recipientName: "",
		recipientAddress: "",
		pickupTime: "",
		Instructions: "",
	};
	const [values, setValues] = useState(originalState);
	const handleSubmit = (e) => {
		e.preventDefault();
		const userValues = Object.values({ ...props.user });
		let canSubmit = true;
		for (let i = 0; i < userValues.length; i++) {
			if (!userValues[i]) {
				canSubmit = false;
			}
		}
		if (canSubmit) {
			const inputValues = Object.values(values);
			let formFilled = true;
			for (let i = 0; i < inputValues.length; i++) {
				if (inputValues[i].length < 1) {
					formFilled = false;
				}
			}
			if (!formFilled) alert("Form not filled correctly");
			if (formFilled) {
				props.create(values);
				setTimeout(() => {
					props.getOrders();
				}, 1200);
				setValues(originalState);
				props.setCreate(false);
				props.history.push("/dashboard");
			}
		} else {
			alert("Your profile is not complete");
		}
	};
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form
			autoComplete="off"
			noValidate
			style={{ display: "flex", marginTop: "50px" }}
			onSubmit={(e) => handleSubmit(e)}
		>
			<Card>
				<CardHeader title="Create an Order" />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								helperText="Please specify full name"
								label="Recipient Name"
								name="recipientName"
								onChange={handleChange}
								defaultValue={values.recipientName}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Recipient Postal Code"
								name="recipientPostalCode"
								onChange={handleChange}
								required
								defaultValue={values.recipientPostalCode}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Recipient Address"
								name="recipientAddress"
								defaultValue={values.recipientAddress}
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Recipient Contact"
								name="recipientContact"
								helperText="e.g 0333xxxxxxx"
								defaultValue={values.recipientContact}
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Pickup Time"
								name="pickupTime"
								helperText="e.g 24 Mar,2020-7:30 pm"
								defaultValue={values.pickupTime}
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Instructions"
								defaultValue={values.Instructions}
								name="Instructions"
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="space-between" p={2} width="100%">
					<Button
						color="primary"
						variant="contained"
						onClick={() => props.setCreate(false)}
					>
						Back
					</Button>
					<Button type="submit" color="primary" variant="contained">
						Create
					</Button>
				</Box>
			</Card>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.userData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		create: (data) => dispatch(orderCreate(data)),
		getOrders: () => dispatch(getOrders()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
