import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, contact, status) {
	return { id, date, name, shipTo, contact, status };
}

const rows = [
	createData(
		0,
		"16 Mar, 2019",
		"Elvis Presley",
		"Tupelo, MS",
		"87654321",
		"Pending Pickup"
	),
	createData(
		1,
		"16 Mar, 2019",
		"Paul McCartney",
		"London, UK",
		"93456789",
		"In Progress"
	),
	createData(
		2,
		"16 Mar, 2019",
		"Tom Scholz",
		"Boston, MA",
		"81234567",
		"In Progress"
	),
	createData(
		3,
		"16 Mar, 2019",
		"Michael Jackson",
		"Gary, IN",
		"82345678",
		"Delivered"
	),
	createData(
		4,
		"15 Mar, 2019",
		"Bruce Springsteen",
		"Long Branch, NJ",
		"91234567",
		"Delivered"
	),
];

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function Orders() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Button variant="contained" color="primary">
				ADD ORDER
			</Button>
			<Title>Recent Orders</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Address</TableCell>
						<TableCell>Contact</TableCell>
						<TableCell align="right">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{row.contact}</TableCell>
							<TableCell align="right">{row.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={classes.seeMore}>
				<Link color="primary" href="#" onClick={preventDefault}>
					See more orders
				</Link>
			</div>
		</React.Fragment>
	);
}
