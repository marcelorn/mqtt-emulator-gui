import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '../components/Card';
import Slider from '../components/Slider';
import RadarChart from '../components/RadarChart';
import LineChart from '../components/ComposedLineChart';
import Button from '../components/Button';
import { sendMessage, startEmulator, stopEmulator } from '../utils/Emulator';
import Dojot from '../utils/Dojot';
import Configs from '../configs';

import IconButton from '@material-ui/core/IconButton';
import StartIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

const styles = {
  container: {
		display: 'flex',
		flexDirection: 'row',
		flexFlow: 'wrap',
	},
	manualContentPanel: {
		flex: 1,
	},
	autoContentPanel: {
		flex: 1.5
	},
	lineChartPanel: {
		display: 'flex',
		flexDirection: 'row',
		flexFlow: 'wrap',
	},
	lineChartContentPanel: {
		flex: 1,
		width: '300px',
	}
};

const {devicesToWatch, propertiesToWatch, lineColors} = Configs;

//console.log(devicesToWatch, propertiesToWatch, lineColors);

function HomePage(props) {

	const {
		classes
	} = props;

	const attrs = [
		{label: 'temperatura', offset: 70, factor: 8, digits: 2},
		{label: 'pressao', offset: 1, factor: 0.4, digits: 2},
		{label: 'vibracao', offset: 70, factor: 13, digits: 2},
		{label: 'rpm', offset: 1300, factor: 20, digits: 0}];

	let [ data, setData ] = useState({[attrs[0].label]: 5, [attrs[1].label]: 5, [attrs[2].label]: 5, [attrs[3].label]: 5});
	let [ propertiesData, setPropertiesData ] = useState({});
	let [ isEmulatorRunning, setEmulatorIsRunning ] = useState(false);

  let resetDevicesData = () => {

		devicesToWatch.map(({id}) => {
			Object.keys(propertiesData).forEach(dataId => {
				let propertyDevices = propertiesData[dataId] || {};

				propertyDevices[id] = [];
				propertiesData[dataId] = propertyDevices;
			});
			setPropertiesData({...propertiesData});
		});
	}

	let toggleEmulator = () => {
		if(isEmulatorRunning) {
			stopEmulator().then((results) => {
				if (results.every((value) => value)) {
					setEmulatorIsRunning(false);
				} else {
					// Send notification: snackbar
				}
			});
		} else {
			startEmulator().then((results) => {
				if (results.every((value) => value)) {
					resetDevicesData();
					setEmulatorIsRunning(true);
					console.log('Start emulator!');
				} else {
					// Send notification: snackbar
				}
			});
		}
	}

	const handleDeviceData = (data) => {
		let deviceId = data.metadata.deviceid;
		let newData = data.attrs;

		//console.log('Device', deviceId, 'sent data', newData);

		Object.keys(newData).forEach(dataId => {
			let dataValue = newData[dataId];
			//console.log('Adding data', dataValue, 'under key', dataId, 'to device', deviceId);

			/* All devices data for a specific attribute */
			let propertyDevices = propertiesData[dataId] || {};
			/* Device data array for a specific attribute */
			let deviceEntries = propertyDevices[deviceId] || [];

			/* Add the new value to device data */
			deviceEntries.push(dataValue);

			propertyDevices[deviceId] = deviceEntries;
			propertiesData[dataId] = propertyDevices;
		});

		//console.log('PROPERPOEA', propertiesData);
		setPropertiesData({...propertiesData});
	}

	let handleSliderChange = (id, value) => {
		//console.log('changing slider id', id, 'to', value);
		data[id] = value;
		setData({...data});
	}

	Dojot.onDeviceData(handleDeviceData);

	return (
		<div className={classes.container}>
	 		<div className={classes.manualContentPanel}>
	 			<Card label="Manual">
	 				<RadarChart 
	 					labels={Object.keys(data)}
	 					data={Object.keys(data).map(id => data[id])}
	 				/>
	 	
	 				<Slider
						label={attrs[0].label + ": " + (attrs[0].offset + data[attrs[0].label] * attrs[0].factor).toFixed(attrs[0].digits)}
	 					value={data[attrs[0].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[0].label, val)}
	 				/>
	 				<Slider
					 	label={attrs[1].label + ": " + (attrs[1].offset + data[attrs[1].label] * attrs[1].factor).toFixed(attrs[1].digits)}
	 					value={data[attrs[1].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[1].label, val)}
	 				/>
	 				<Slider
					 	label={attrs[2].label + ": " + (attrs[2].offset + data[attrs[2].label] * attrs[2].factor).toFixed(attrs[2].digits)}
	 					value={data[attrs[2].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[2].label, val)}
	 				/>
	 				<Slider
					 	label={attrs[3].label + ": " + (attrs[3].offset + data[attrs[3].label] * attrs[3].factor).toFixed(attrs[3].digits)}
	 					value={data[attrs[3].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[3].label, val)}
	 				/>
	 	
	 				<Button
	 					onClick={() => {
							const newData = {};
							attrs.forEach((item, index, arr) => {
								newData[item.label] = parseFloat((item.offset + data[item.label] * item.factor).toFixed(item.digits));
							});
							sendMessage(newData);
						}}
	 				>
	 					Enviar
	 				</Button>
	 			</Card>
	 		</div>

	 		<div className={classes.autoContentPanel}>
	 			<Card label="Automático">
					<div className={classes.lineChartPanel}>
					{propertiesToWatch.map(label => {

						let propertyData = propertiesData[label] || {} ;

						//console.log('Property data for', label, 'is', propertyData);
						let data = devicesToWatch.filter(({id}) => { return propertyData.hasOwnProperty(id)}).map(({id, label, lineColor}) => {
							//console.log('Data for device', label, ':', propertyData[id]);
							return {
								label: label,
								data: propertyData[id],
								fill: false,
								backgroundColor: lineColor,
								borderWidth: 1,
								borderColor: lineColor,
								pointRadius: 0
							}
						});
	
						//console.log('Rendering chart with data:', data);

		 	 			return (
							<div className={classes.lineChartContentPanel}>
							<Card label={label}>
					 			<LineChart
					 				data={data}
					 			/>
					 		</Card>
							</div>
						);
					})}
					</div>
					<IconButton color="primary"
						onClick={() => toggleEmulator()}
					>
	 					{isEmulatorRunning ? <StopIcon /> : <StartIcon />}
	 				</IconButton>
	 			</Card>
	 		</div>
		</div>
	);
}

export default withStyles(styles)(HomePage);
