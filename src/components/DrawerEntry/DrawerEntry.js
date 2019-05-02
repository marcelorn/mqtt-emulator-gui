import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



const drawerWidth = 240;


const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	toolbar: theme.mixins.toolbar,
});

function DrawerEntry(props) {

	const {
		classes,
		value,
		onClick,
	} = props;

	return (
		<ListItem button onClick={onClick} key={value}>
			<ListItemIcon>
				<InboxIcon />
			</ListItemIcon>
			<ListItemText primary={value} />
		</ListItem>
	);
}

export default withStyles(styles)(DrawerEntry);
