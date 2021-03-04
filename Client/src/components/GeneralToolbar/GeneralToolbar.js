import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import ProfileIcon from "@material-ui/icons/Person";
import SignOutIcon from "@material-ui/icons/ExitToApp";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../Store/actions/authActions";
import { cleanOrders } from "../../Store/actions/orderActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
}));

const GeneralToolbar = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<>
				<CssBaseline />
				<AppBar
					position="absolute"
					className={clsx(classes.appBar, open && classes.appBarShift)}
				>
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							className={clsx(
								classes.menuButton,
								open && classes.menuButtonHidden
							)}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}
						>
							{props.name}
						</Typography>
						<IconButton
							color="inherit"
							onClick={() => {
								props.signOut();
								props.clean();
							}}
						>
							<Typography
								variant="button"
								color="inherit"
								noWrap
								className={classes.title}
							>
								Sign Out&nbsp;
							</Typography>
							<ExitToAppIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<div>
							<Link exact="true" to="/dashboard">
								<ListItem button>
									<ListItemIcon>
										<DashboardIcon />
									</ListItemIcon>
									<ListItemText primary="Dashboard" />
								</ListItem>
							</Link>
							<Link exact="true" to="/orders">
								<ListItem button>
									<ListItemIcon>
										<ShoppingCartIcon />
									</ListItemIcon>
									<ListItemText primary="Orders" />
								</ListItem>
							</Link>
							{props.userType === "admin" && (
								<Link exact="true" to="/customers">
									<ListItem button>
										<ListItemIcon>
											<PeopleIcon />
										</ListItemIcon>
										<ListItemText primary="Customers" />
									</ListItem>
								</Link>
							)}
						</div>
					</List>
					<Divider />
					<List>
						<div>
							<Link exact="true" to="/profile">
								<ListItem button>
									<ListItemIcon>
										<ProfileIcon />
									</ListItemIcon>
									<ListItemText primary="Profile" />
								</ListItem>
							</Link>
							<ListItem
								button
								onClick={() => {
									props.signOut();
									props.clean();
								}}
							>
								<ListItemIcon>
									<SignOutIcon />
								</ListItemIcon>
								<ListItemText primary="Signout" />
							</ListItem>
						</div>
					</List>
				</Drawer>
				{props.children}
			</>
		</div>
	);
};

const mapStateToProps = (state) => {
	const type = state.auth.userData;
	return {
		userType: type ? type.userType : null,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
		clean: () => dispatch(cleanOrders()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralToolbar);
