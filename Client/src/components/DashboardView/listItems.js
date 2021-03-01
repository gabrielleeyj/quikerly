import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import ProfileIcon from "@material-ui/icons/Person";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

export const mainListItems = (props) => {
	return (
		<div>
			<Link exact='true' to='/dashboard' >
				<ListItem button>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</Link>
			<Link exact='true' to='/orders' >
				<ListItem button>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="Orders" />
				</ListItem>
			</Link>
			{props.userType === 'admin' && <Link exact='true' to='/customers' >
				<ListItem button>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Customers" />
				</ListItem>
			</Link>}
		</div >
	)
};

export const secondaryListItems = (props) => {
	return (
		<div>
			<Link exact='true' to='/profile' >
				<ListItem button>
					<ListItemIcon>
						<ProfileIcon />
					</ListItemIcon>
					<ListItemText primary="Profile" />
				</ListItem>
			</Link>
			<ListItem button onClick={() => props.signOut()} >
				<ListItemIcon>
					<SignOutIcon />
				</ListItemIcon>
				<ListItemText primary="Signout" />
			</ListItem>
		</div >
	)
};
