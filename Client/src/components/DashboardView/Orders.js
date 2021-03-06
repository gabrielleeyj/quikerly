import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import clsx from "clsx";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import {
	deleteOrder,
	getOrders,
	selectedOrders,
	updateOrder,
} from "../../Store/actions/orderActions";
import {
	Box,
	Button,
	Grid,
	MenuItem,
	TablePagination,
	Modal,
	Paper,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import date from "date-and-time";
import { CSVLink } from "react-csv";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 640,
	},
}));

const Orders = ({
	rows,
	getOrders,
	userData,
	updateOrder,
	searchNumber,
	deleteOrder,
	selectOrders,
}) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(0);
	const [select, setSelect] = useState({
		selectFrom: null,
		selectTo: null,
	});

	const userRole = (userData) => {
		if (!userData) {
			return null;
		}
		const user = userData.userType;
		return user;
	};
	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};
	const handleOpen = (order) => {
		setSelectedOrder(order);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setSelectedOrder(null);
		setEdit(false);
	};
	const handleUpdate = () => {
		if (userRole === "admin") {
			const update = {
				recipientName: document.getElementById("recipientName").value,
				recipientContact: document.getElementById("recipientContact").value,
				recipientAddress: document.getElementById("recipientAddress").value,
				recipientPostalCode: document.getElementById("recipientPostalCode")
					.value,
				instructions: document.getElementById("instructions").value,
				pickupTime: document.getElementById("pickupTime").value,
				cost: document.getElementById("cost").value,
				driver: document.getElementById("driver").value,
				status: document.getElementById("status").textContent,
			};
			updateOrder(update, selectedOrder._id);
		}
		if (userRole === "user") {
			const update = {
				recipientName: document.getElementById("recipientName").value,
				recipientContact: document.getElementById("recipientContact").value,
				recipientAddress: document.getElementById("recipientAddress").value,
				recipientPostalCode: document.getElementById("recipientPostalCode")
					.value,
				instructions: document.getElementById("instructions").value,
				pickupTime: document.getElementById("pickupTime").value,
			};
			updateOrder(update, selectedOrder._id);
		}

		setOpen(false);
		setEdit(false);
	};
	const handleEdit = () => {
		setEdit(true);
	};
	const handleDelete = () => {
		deleteOrder(selectedOrder._id);
		setTimeout(() => {
			getOrders();
			setOpen(false);
		}, 700);
	};
	useEffect(() => {
		getOrders();
	}, [userData]);

	if (searchNumber) {
		rows = rows.filter((row) => row.deliveryOrderNumber.includes(searchNumber));
	}

	const handleChange = (e) => {
		let val = e.target.value.replaceAll("-", "/");
		val = date.transform(val, "YYYY/MM/DD", "DD/MM/YYYY");
		setSelect({
			...select,
			[e.target.id]: val,
		});
	};
	const filter = () => {
		if (select.selectTo.slice(6, 10) >= select.selectFrom.slice(6, 10))
			if (select.selectTo.slice(3, 5) >= select.selectFrom.slice(3, 5))
				if (select.selectTo.slice(0, 2) >= select.selectFrom.slice(0, 2))
					selectOrders(select.selectFrom, select.selectTo);
				else alert("Please Select A Valid Interval");
			else alert("Please Select A Valid Interval");
		else alert("Please Select A Valid Interval");
	};
	return (
		<React.Fragment>
			<Box style={{ display: "flex", justifyContent: "space-between" }}>
				<Box
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "33%",
					}}
				>
					<TextField
						id="selectFrom"
						label="Select From"
						type="date"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="selectTo"
						onChange={handleChange}
						label="Select To"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Box>
				<Box style={{ marginRight: "150px" }}>
					<Title key={1}>Recent Orders</Title>
				</Box>
				<Box style={{ width: "130px" }}>
					<Button
						color="secondary"
						fullWidth
						variant="outlined"
						onClick={filter}
					>
						Filter
					</Button>
				</Box>
			</Box>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table key={2} size="small">
						<TableHead>
							<TableRow>
								<TableCell>Order Number</TableCell>
								<TableCell>Date (ISO)</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Address</TableCell>
								<TableCell>Contact</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						{rows && (
							<TableBody>
								{(limit > 0
									? rows.slice(page * limit, page * limit + limit)
									: rows
								).map((row) => (
									<TableRow
										onClick={() => handleOpen(row)}
										hover
										style={{ cursor: "pointer" }}
										key={row.deliveryOrderNumber}
									>
										<TableCell>{row.deliveryOrderNumber}</TableCell>
										{row.orderDate && <TableCell>{row.orderDate}</TableCell>}
										<TableCell>{row.userName}</TableCell>
										<TableCell>{row.userAddress}</TableCell>
										<TableCell>{row.userContact}</TableCell>
										<TableCell>{row.status}</TableCell>
									</TableRow>
								))}
							</TableBody>
						)}
					</Table>
				</Box>
			</PerfectScrollbar>
			{rows && (
				<TablePagination
					component="div"
					count={rows.length}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleLimitChange}
					page={page}
					rowsPerPage={limit}
					rowsPerPageOptions={[
						5,
						10,
						25,
						50,
						{ value: rows.length, label: "All" },
					]}
				/>
			)}
			{selectedOrder && (
				<Modal open={open} onClose={handleClose}>
					<Grid
						item
						xs={12}
						md={8}
						lg={9}
						style={{ position: "absolute", top: "4vh", left: "40vw" }}
					>
						<Paper className={fixedHeightPaper}>
							<Typography style={{ textAlign: "center", marginBottom: "15px" }}>
								Order placed by {selectedOrder.userName.toUpperCase()} on{" "}
								{selectedOrder.orderDate}
							</Typography>
							<Table size="medium">
								<TableBody>
									<TableRow key={1} hover>
										<TableCell>Customer Contact</TableCell>
										<TableCell>{selectedOrder.userContact}</TableCell>
									</TableRow>
									<TableRow key={2} hover>
										<TableCell>Customer Address</TableCell>
										<TableCell>{selectedOrder.userAddress}</TableCell>
									</TableRow>
									<TableRow key={3} hover>
										<TableCell>Customer Postal Code</TableCell>
										<TableCell>{selectedOrder.userPostalCode}</TableCell>
									</TableRow>
									<TableRow key={4} hover>
										<TableCell>Recipient Name</TableCell>
										<TableCell>
											{edit && (userRole === "admin" || "user") ? (
												<TextField
													name="recipientName"
													id="recipientName"
													defaultValue={selectedOrder.recipientName}
												/>
											) : (
												selectedOrder.recipientName
											)}
										</TableCell>
									</TableRow>
									<TableRow key={5} hover>
										<TableCell>Recipient Contact</TableCell>
										<TableCell>
											{edit && (userRole === "admin" || "user") ? (
												<TextField
													name="recipientContact"
													id="recipientContact"
													defaultValue={selectedOrder.recipientContact}
												/>
											) : (
												selectedOrder.recipientContact
											)}
										</TableCell>
									</TableRow>
									<TableRow key={6} hover>
										<TableCell>Recipient Address</TableCell>
										<TableCell>
											{edit && (userRole === "admin" || "user") ? (
												<TextField
													name="recipientAddress"
													id="recipientAddress"
													defaultValue={selectedOrder.recipientAddress}
												/>
											) : (
												selectedOrder.recipientAddress
											)}
										</TableCell>
									</TableRow>
									<TableRow key={7} hover>
										<TableCell>Recipient Postal Code</TableCell>
										<TableCell>
											{edit && (userRole === "admin" || "user") ? (
												<TextField
													name="recipientPostalCode"
													id="recipientPostalCode"
													defaultValue={selectedOrder.recipientPostalCode}
												/>
											) : (
												selectedOrder.recipientPostalCode
											)}
										</TableCell>
									</TableRow>
									<TableRow key={8} hover>
										<TableCell>Instructions</TableCell>
										<TableCell>
											{edit && (userRole === "admin" || "user") ? (
												<TextField
													name="instructions"
													id="instructions"
													defaultValue={selectedOrder.Instructions}
												/>
											) : (
												selectedOrder.Instructions
											)}
										</TableCell>
									</TableRow>
									<TableRow key={9} hover>
										<TableCell>Pickup Time</TableCell>
										<TableCell>
											{edit && (userRole === "admin" || "user") ? (
												<TextField
													name="pickupTime"
													id="pickupTime"
													defaultValue={selectedOrder.pickupTime}
												/>
											) : (
												selectedOrder.pickupTime
											)}
										</TableCell>
									</TableRow>
									<TableRow key={10} hover>
										<TableCell>Cost</TableCell>
										<TableCell>
											{edit && userRole === "admin" ? (
												<TextField
													name="cost"
													id="cost"
													defaultValue={selectedOrder.cost ?? ""}
												/>
											) : (
												selectedOrder.cost
											)}
										</TableCell>
									</TableRow>
									<TableRow key={11} hover>
										<TableCell>Driver</TableCell>
										<TableCell>
											{edit && userRole === "admin" ? (
												<TextField
													name="driver"
													id="driver"
													defaultValue={selectedOrder.driver ?? ""}
												/>
											) : (
												selectedOrder.driver
											)}
										</TableCell>
									</TableRow>
									<TableRow key={12} hover>
										<TableCell>Status</TableCell>
										<TableCell>
											{edit && userRole === "admin" ? (
												<Select
													fullWidth
													name="status"
													id="status"
													defaultValue={selectedOrder.status ?? ""}
												>
													<MenuItem value={"Pending Pickup"}>
														Pending Pickup
													</MenuItem>
													<MenuItem value={"In Progress"}>In Progress</MenuItem>
													<MenuItem value={"Delivered"}>Delivered</MenuItem>
												</Select>
											) : (
												selectedOrder.status
											)}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Box style={{ display: "flex", marginBottom: "15px" }}>
								<Button
									onClick={handleUpdate}
									fullWidth
									color="secondary"
									variant="contained"
								>
									Save
								</Button>
								<Button
									onClick={handleEdit}
									fullWidth
									color="secondary"
									variant="contained"
								>
									Edit
								</Button>
							</Box>
							<Button
								onClick={handleDelete}
								color="secondary"
								variant="outlined"
							>
								Delete
							</Button>
						</Paper>
					</Grid>
				</Modal>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	const ordersList = state.order.orders;
	return { rows: ordersList, userData: state.auth.userData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOrders: () => dispatch(getOrders()),
		updateOrder: (order, order_id) => dispatch(updateOrder(order, order_id)),
		deleteOrder: (orderId) => dispatch(deleteOrder(orderId)),
		selectOrders: (selectFrom, selectTo) =>
			dispatch(selectedOrders(selectFrom, selectTo)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
