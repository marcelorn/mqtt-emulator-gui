import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

function Form(props) {

	const {
		classes,
		children,
	} = props;

	return (
		<>
			<p>This is the form container</p>
			{children}
		</>
	);

}

export default withStyles(styles)(Form);
