import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
});

function FormInput(props) {

	const {
		classes,
		label,
	} = props;

	return (
		<p>This is the input {label}</p>
	);

}

export default withStyles(styles)(FormInput);
