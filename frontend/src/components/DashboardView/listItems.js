import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import fire from "../../firebase/Config";

const signOut = () => {
	fire.auth().signOut();
};

export const mainListItems = (
	<div>
		<NavLink to="/dashboard">
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
		</NavLink>

		<NavLink to="/orders">
			<ListItem button>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Orders" />
			</ListItem>
		</NavLink>

		<NavLink to="/customers">
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Customers" />
			</ListItem>
		</NavLink>
	</div>
);

export const secondaryListItems = (
	<div>
		<NavLink to="/profile">
			<ListItem button>
				<ListItemIcon>
					<AccountCircleIcon />
				</ListItemIcon>
				<ListItemText primary="Profile" />
			</ListItem>
		</NavLink>
		<ListItem button>
			<ListItemIcon>
				<ExitToAppIcon onClick={signOut} />
			</ListItemIcon>
			<ListItemText primary="Sign Out" />
		</ListItem>
	</div>
);
