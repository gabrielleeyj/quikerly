import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import fire from "../../firebase/Config";

const signOut = () => {
	fire.auth().signOut();
};

export const mainListItems = (
	<div>
		<Link to="/dashboard">
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
		</Link>

		<Link to="/orders">
			<ListItem button>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Orders" />
			</ListItem>
		</Link>

		<Link to="/customers">
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Customers" />
			</ListItem>
		</Link>
	</div>
);

export const secondaryListItems = (
	<div>
		<Link to="/profile">
			<ListItem button>
				<ListItemIcon>
					<AccountCircleIcon />
				</ListItemIcon>
				<ListItemText primary="Profile" />
			</ListItem>
		</Link>
		<ListItem button>
			<ListItemIcon>
				<ExitToAppIcon onClick={signOut} />
			</ListItemIcon>
			<ListItemText primary="Sign Out" />
		</ListItem>
	</div>
);
