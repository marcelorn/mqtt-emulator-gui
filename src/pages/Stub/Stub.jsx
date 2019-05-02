import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

//import Input from '@material-ui/core/Input';
//import RaisedButton from '@material-ui/core/RaisedButton';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import Button from '@material-ui/core/Button';

const DEBUG = (...message) => {
	console.log('[FileSelector]', ...message);
}

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	// gridHeader: {
	// 	paddingTop: theme.spacing.unit * 3,
	// },
	mainGrid: {
		padding: theme.spacing.unit * 3,
	},
	formControl: {
		width: '100%',
	},
	formLabel: {
		display: 'flex',
	},
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function Stub(props) {

	const {
		classes,
	} = props;

	DEBUG('Rendering FileSelector with props:', props);

	let { formSchema, handleChange } = props;

	let { onFileDelete, onFileDownload } = props;

	let files = props.files || [];
	DEBUG('FileSelector has files:', files);

	return (
		<div className={classes.root}>
	
			<List className={classes.root}>
				{files.map(file => (
					<ListItem key={file.name} >
						<ListItemText primary={file.name} />
						<ListItemSecondaryAction>

							{file.downloadURL && <IconButton
								aria-label="Download" 
								href={file.downloadURL}
								download={file.name}
							>
								<DownloadIcon />
							</IconButton>}

							{onFileDelete && <IconButton 
								aria-label="Delete"
								onClick={() => {
									DEBUG('deleting file', file.name);
									onFileDelete(file);
								}}
							>
								<DeleteIcon />
							</IconButton>}
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>

				<Button
					variant="contained"
					color="primary"
					component="label"
					className={classes.button}
				>
					<UploadIcon className={classes.leftIcon} />
					{props.buttonLabel}
					<input
						type="file"
						multiple
						style={{ display: "none" }}
						onChange={(e) => {
							let input = e.target;
							if(input) {
								DEBUG('Selecting files from :', input);
								if(input.files && input.files.length > 0) {
									let inputFiles = input.files;
									DEBUG('Selected files:', inputFiles) 
									let selectedFiles = Object.keys(inputFiles).map(fileId => inputFiles[fileId]);
									//let selectedFiles = Object.keys(inputFiles).map(fileId => { return {... inputFiles[fileId], downloadURL: 'https://google.com/'}});
									props.onFilesSelect && props.onFilesSelect(selectedFiles);
								} else {
									DEBUG('No files selected');
								}
							}
						}}
					/>
				</Button>
				
		</div>
	);
}

export default withStyles(styles)(Stub);
