import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { connect } from "react-redux";

// Generate Sales Data
function createData(month, noOfOrders) {
	return { month, noOfOrders };
}

const Chart = ({ orders }) => {
	const theme = useTheme();
	const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	if (orders) {
		const orderDates = orders.map((order) =>
			order.orderDate ? order.orderDate.slice(3, 5) : "0"
		);
		for (let i = 0; i < orderDates.length; i++) {
			const el = parseInt(orderDates[i]);
			arr[el]++;
		}
	}
	const data = [
		createData("Jan", arr[1]),
		createData("Feb", arr[2]),
		createData("Mar", arr[3]),
		createData("Apr", arr[4]),
		createData("May", arr[5]),
		createData("Jun", arr[6]),
		createData("Jul", arr[7]),
		createData("Aug", arr[8]),
		createData("Sep", arr[9]),
		createData("Oct", arr[10]),
		createData("Nov", arr[11]),
		createData("Dec", arr[12]),
	];
	return (
		<React.Fragment>
			<Title>Today</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis dataKey="month" stroke={theme.palette.text.secondary} />
					<YAxis stroke={theme.palette.text.secondary}>
						<Label
							angle={270}
							position="left"
							style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
						>
							No of orders
						</Label>
					</YAxis>
					<Line
						type="monotone"
						dataKey="noOfOrders"
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
	};
};

export default connect(mapStateToProps, null)(Chart);
