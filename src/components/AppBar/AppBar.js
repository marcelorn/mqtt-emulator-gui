import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  root: {
	display: 'flex',
	flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
	flexGrow: 1,
  },
  menuButton: {
	marginLeft: -12,
	marginRight: 20,
  },
});

function AppBar(props) {
	const { 
		classes,
		title = 'App title',
	} = props;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<MAppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						{title}
					</Typography>
				</Toolbar>
			</MAppBar>
			{props.children}
		</div>
	);
}

AppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
