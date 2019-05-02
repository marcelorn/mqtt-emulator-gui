import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const styles = {
  card: {
    minWidth: '275px',
		margin: '8px',
		padding: '16px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const {
		classes,
		label,
		children
	} = props;

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <Typography variant="h6" component="h2">
        {label}
      </Typography>

      <CardContent>
				{children}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SimpleCard);
