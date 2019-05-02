import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

function Stub(props) {

	const {
		classes,
	} = props;

	return (
		<p>Stub used as new component's boilerplate</p>
	);
}

export default withStyles(styles)(Stub);
