import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import date from 'date-and-time'
import { connect } from 'react-redux'

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
});

const Deposits = ({ ordersList }) => {
	const classes = useStyles();
	const now = new Date()
	return (
		<React.Fragment>
			<Title>Total Orders</Title>
			<Typography component="p" variant="h4">
				{ordersList && ordersList.length}
			</Typography>
			<Typography color="textSecondary" className={classes.depositContext}>
				as of {date.format(now, 'ddd, MMM DD YYYY')}
			</Typography>
		</React.Fragment>
	);
}


const mapStateToProps = (state) => {
	const ordersList = state.order.orders;
	return { ordersList: ordersList }
}

export default connect(mapStateToProps, null)(Deposits);