import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function ContainedButton(props) {
  const {
		classes,
		variant = "contained",
		color = "primary",
		children,
		...otherProps
	} = props;
  return (
    <div>
      <Button
				variant={variant}
				color={color}
				className={classes.button}
				{...otherProps}
			>
        {children}
      </Button>
    </div>
  );
}

export default withStyles(styles)(ContainedButton);
