import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
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

function FileSelector(props) {

	const {
		classes,
		files = [],
		onFilesSelect,
		onFileDelete,
	} = props;

	let [ selectedFiles, setSelectedFiles ] = useState(files);


	let handleSelection = (e) => {
		console.log('Handling files selection on event', e);
		let input = e.target;
		if(input) {
			console.log('Selecting files from :', input);
			if(input.files && input.files.length > 0) {
				let inputFiles = input.files;
				let newFiles = Object.keys(inputFiles).map(fileId => inputFiles[fileId]);
				console.log('Selected files:', newFiles) 
				setSelectedFiles([...selectedFiles, ...newFiles]);
			} else {
				console.log('No files selected');
			}
		}
	}

	console.log('Rendering with selectedFiles:', selectedFiles);

	return (
		<div className={classes.root}>
	
			<List className={classes.root}>
				{selectedFiles.map(file => (
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
									console.log('deleting file', file.name);
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
					Upload
					<input
						type="file"
						multiple
						style={{ display: "none" }}
						onChange={(e) => {
							handleSelection(e);
						}}
					/>
				</Button>
				
		</div>
	);
}

export default withStyles(styles)(FileSelector);
