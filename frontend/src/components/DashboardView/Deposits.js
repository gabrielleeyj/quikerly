import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
});

let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");

export default function Deposits() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Title>Total Orders</Title>
			<Typography component="p" variant="h4">
				3024
			</Typography>
			<Typography color="textSecondary" className={classes.depositContext}>
				as of {date}/{month}/{year}
			</Typography>
			<div>
				<Link color="primary" href="#" onClick={preventDefault}>
					View Orders
				</Link>
			</div>
		</React.Fragment>
	);
}
