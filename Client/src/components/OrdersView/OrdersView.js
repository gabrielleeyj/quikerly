import {
	Button,
	CssBaseline,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Orders from "../DashboardView/Orders";
import GeneralToolbar from "../GeneralToolbar/GeneralToolbar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Deposits from "../DashboardView/Deposits";
import clsx from "clsx";
import CreateOrder from "./CreateOrder";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			{/* <Link color="inherit" href="https://material-ui.com/"> */}
			Quikerly
			{/* </Link>{" "} */}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		display: "flex",
		paddingBottom: theme.spacing(3),
	},
	top: {
		paddingTop: theme.spacing(10),
	},
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
	search: {
		height: 90,
	},
}));

const OrdersView = (props) => {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const search = clsx(classes.paper, classes.search);
	const [searchNumber, setSearchNumber] = useState(null);
	const [create, setCreate] = useState(false);

	const handleChange = (e) => {
		setSearchNumber(e.target.value);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<GeneralToolbar name="Orders" />
			<div className={classes.top}>
				<Container maxWidth="lg" className={classes.container} lg={12}>
					<Grid container spacing={3}>
						<Grid key={1} item xs={12} md={8} lg={9}>
							{create && (
								<CreateOrder history={props.history} setCreate={setCreate} />
							)}
						</Grid>
						{!create && (
							<>
								<Grid
									key={2}
									item
									xs={12}
									md={4}
									lg={8}
									style={{
										display: "flex",
										justifyContent: "space-around",
										flexDirection: "column",
									}}
								>
									{!create && (
										<Button
											style={{ width: "150px", marginTop: "40px" }}
											color="secondary"
											variant="outlined"
											onClick={() => setCreate(true)}
										>
											Create Order
										</Button>
									)}
									<Paper className={search}>
										<TextField
											fullWidth
											onChange={handleChange}
											name="searchEmail"
											label="Search by order number"
											variant="outlined"
										/>
									</Paper>
								</Grid>
								<Grid key={3} item xs={12} md={4} lg={4}>
									<Paper className={fixedHeightPaper}>
										<Deposits />
									</Paper>
								</Grid>
								<Grid key={4} item xs={12} lg={12}>
									<Paper className={classes.paper}>
										<Orders searchNumber={searchNumber} />
									</Paper>
								</Grid>
							</>
						)}
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</div>
		</div>
	);
};

export default OrdersView;
