import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	stubBorderClassPleaseDeleteLater: {
		borderStyle: 'solid',
		border: '1px',
	}
});

function FormSection(props) {

	const {
		classes,
		children,
		label,
	} = props;

	return (
		<div className={classes.stubBorderClassPleaseDeleteLater}>
			<p>This is the section {label}</p>
			{children}
		</div>
	);

}

export default withStyles(styles)(FormSection);
