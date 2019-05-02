import React, { useState } from 'react';
import DefaultImage from './defaultImage.png';
import BrokenImage from './brokenImage.png';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonIcon from '@material-ui/icons/CameraAlt';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '300px',
		height: '300px',
	},
	profile: {
		flex: 1,
	},
	image: {
		width: '100%',
	},
	selector: {
		flex: 1,
		margin: '16px auto',
	},
  icon: {
    marginRight: theme.spacing.unit,
  },
  hide: {
    display: 'none',
  },
});

function ProfilePic(props) {

	const {
		classes,
		onFileSelect = () => {},
		src = DefaultImage,
	} = props;

	let [ imgSrc, setImgSrc ] = useState(src);

	let handleSelection = (e) => {
		let file = e.target.files[0];
		setImgSrc(URL.createObjectURL(file));
		onFileSelect(file);
	}

	let hasPlaceholderImage = imgSrc === DefaultImage;

	return (
		<div className={classes.container}>

			<div className={classes.profile}>
				<img
					alt="Profile picture"
					className={classes.image}
					src={imgSrc}
				/>
			</div>

			<div className={classes.selector}>
				<input 
				  accept="image/*" 
				  className={classes.hide}
				  id="raised-button-file"
				  type="file"
					onChange={handleSelection}
				/> 
				<label htmlFor="raised-button-file">
					<Button	color="primary"	variant="contained"	component="span">
						<ButtonIcon className={classes.icon} />
						{hasPlaceholderImage ? 'Add' : 'Change'}
					</Button>
				</label>
			</div>
		</div>
	);
}

export default withStyles(styles)(ProfilePic);
