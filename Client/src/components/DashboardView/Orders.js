import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import clsx from "clsx";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import date from 'date-and-time'
import { connect } from 'react-redux'
import { getOrders, updateOrder } from '../../Store/actions/orderActions'
import { Button, Grid, MenuItem, Modal, Paper, Select, TextField, Typography } from "@material-ui/core";


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




const Orders = ({ rows, getOrders, userData, updateOrder, searchEmail }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false)
	const [edit, setEdit] = useState(false)
	const [values, setValues] = useState({
		cost: '',
		status: '',
		driver: ''
	})
	const [selectedOrder, setSelectedOrder] = useState(null)
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const handleOpen = (order) => {
		setSelectedOrder(order)
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
		setSelectedOrder(null)
		setEdit(false)
	}
	const handleUpdate = () => {
		const update = {
			cost: document.getElementById('cost').value,
			driver: document.getElementById('driver').value,
			status: document.getElementById('status').textContent
		}
		updateOrder(update, selectedOrder._id)
		setOpen(false)
		setEdit(false)
	}
	const handleEdit = () => {
		setEdit(true)
	}
	useEffect(() => {
		getOrders()
	}, [userData])

	if (searchEmail) {
		rows = rows.filter((row) => (row.userEmail).includes(searchEmail))
	}

	return (
		<React.Fragment>
			<Title key={1}>Recent Orders</Title>
			<Table key={2} size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Address</TableCell>
						<TableCell>Contact</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				{rows && <TableBody>
					{rows.map((row) => (
						<TableRow onClick={() => handleOpen(row)} hover style={{ cursor: 'pointer' }} key={row._id}>
							{row.deliveryOrder && <TableCell>{row.deliveryOrder}</TableCell>}
							<TableCell>{row.userName}</TableCell>
							<TableCell>{row.userAddress}</TableCell>
							<TableCell>{row.userContact}</TableCell>
							<TableCell>{row.status}</TableCell>
						</TableRow>
					))}
				</TableBody>}
				{selectedOrder && <Modal open={open} onClose={handleClose} >
					<Grid item xs={12} md={8} lg={9} style={{ position: 'absolute', top: '4vh', left: '40vw' }} >
						<Paper className={fixedHeightPaper} >
							<Typography style={{ textAlign: 'center', marginBottom: '15px' }} >Order placed by {selectedOrder.userName.toUpperCase()} on {selectedOrder.deliveryOrder}</Typography>
							<Table size='medium' >
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
										<TableCell>{selectedOrder.recipientName}</TableCell>
									</TableRow>
									<TableRow key={5} hover>
										<TableCell>Recipient Contact</TableCell>
										<TableCell>{selectedOrder.recipientContact}</TableCell>
									</TableRow>
									<TableRow key={6} hover>
										<TableCell>Recipient Address</TableCell>
										<TableCell>{selectedOrder.recipientAddress}</TableCell>
									</TableRow>
									<TableRow key={7} hover>
										<TableCell>Recipient Postal Code</TableCell>
										<TableCell>{selectedOrder.recipientPostalCode}</TableCell>
									</TableRow>
									<TableRow key={8} hover>
										<TableCell>Instructions</TableCell>
										<TableCell>{selectedOrder.Instructions}</TableCell>
									</TableRow>
									<TableRow key={9} hover>
										<TableCell>Pickup Time</TableCell>
										<TableCell>{selectedOrder.pickupTime}</TableCell>
									</TableRow>
									<TableRow key={10} hover>
										<TableCell>Cost</TableCell>
										<TableCell>{edit ? <TextField name='cost' id='cost' defaultValue={selectedOrder.cost ?? ''} /> : selectedOrder.cost}</TableCell>
									</TableRow>
									<TableRow key={11} hover>
										<TableCell>Driver</TableCell>
										<TableCell>{edit ? <TextField name='driver' id='driver' defaultValue={selectedOrder.driver ?? ''} /> : selectedOrder.driver}</TableCell>
									</TableRow>
									<TableRow key={12} hover>
										<TableCell>Status</TableCell>
										<TableCell>{edit ? <Select
											fullWidth
											name='status'
											id='status'
											defaultValue={selectedOrder.status ?? ''}
										>
											<MenuItem value={'Pending Pickup'}>Pending Pickup</MenuItem>
											<MenuItem value={'In Progress'}>In Progress</MenuItem>
											<MenuItem value={'Delivered'}>Delivered</MenuItem>
										</Select> : selectedOrder.status}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							{userData.userType === 'admin' && <div style={{ display: 'flex' }} >
								<Button onClick={handleUpdate} fullWidth color='secondary' variant='contained' >Save</Button>
								<Button onClick={handleEdit} fullWidth color='secondary' variant='contained' >Edit</Button>
							</div>}
						</Paper>
					</Grid>
				</Modal>}
			</Table>
		</React.Fragment >
	);
}

const mapStateToProps = (state) => {
	const ordersList = state.order.orders;
	return { rows: ordersList, userData: state.auth.userData }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getOrders: () => dispatch(getOrders()),
		updateOrder: (order, order_id) => dispatch(updateOrder(order, order_id))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);