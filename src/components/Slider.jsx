import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: '100%'
  },
  slider: {
    padding: '20px 0px'
  }
};

class SimpleSlider extends React.Component {

  render() {
    const { 
			classes,
			min = 0,
      max = 10,
      step = 0.01,
			label = "Default label",
			onChange = () => {},
			value = 5,
    } = this.props;

    return (
      <div className={classes.root}>
        <Typography id="label">{label}</Typography>
        <Slider
          classes={{ container: classes.slider}}
          aria-labelledby="label"
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          value={value}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSlider);
