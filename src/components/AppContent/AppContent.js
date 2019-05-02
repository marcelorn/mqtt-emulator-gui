import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  toolbar: theme.mixins.toolbar,
});

function ButtonAppContent(props) {
	const { 
		classes,
		title = 'App title',
		children,
	} = props;

	return (
		<div className={classes.content}>
      <div className={classes.toolbar} />
			{children}
    </div>
	);
}

ButtonAppContent.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppContent);
