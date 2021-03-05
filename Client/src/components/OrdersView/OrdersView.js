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
		// backgroundColor: theme.palette.background.dark,
		// minHeight: "100%",
		display: "flex",
		// paddingBottom: theme.spacing(3),
	},
	// top: {
	// 	paddingTop: theme.spacing(10),
	// },
	appBarSpacer: theme.mixins.toolbar,
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
	button: {
		textAlign: "left",
	},
}));

const OrdersView = (props) => {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const search = clsx(classes.paper, classes.search);
	const button = clsx(classes.paper, classes.button);
	const [searchNumber, setSearchNumber] = useState(null);
	const [create, setCreate] = useState(false);

	const handleChange = (e) => {
		setSearchNumber(e.target.value);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<GeneralToolbar name="Orders" />
			<main className={classes.content}>
				<div className={classes.top}>
					<Container maxWidth="lg" className={classes.container}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={8} lg={9}>
								{create && (
									<CreateOrder history={props.history} setCreate={setCreate} />
								)}
							</Grid>
							{!create && (
								<>
									<Grid item xs={12} md={12} lg={12}>
										<Paper className={button}>
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
										</Paper>
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
										lg={6}
										style={{
											display: "flex",
											justifyContent: "space-around",
											flexDirection: "column",
											paddingTop: "20px",
											marginTop: "20px",
										}}
									>
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
									<Grid item lg={3} md={1}></Grid>
									<Grid item xs={12} md={5} lg={3}>
										<Paper className={fixedHeightPaper}>
											<Deposits />
										</Paper>
									</Grid>
									<Grid item xs={12}>
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
			</main>
		</div>
	);
};

export default OrdersView;
