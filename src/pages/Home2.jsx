import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileSelector from '../components/FileSelector';
import Card from '../components/Card';
import ChartCard from '../components/ChartCard';
import Slider from '../components/Slider';
import RadarChart from '../components/RadarChart';
import LineChart from '../components/ComposedLineChart';
//import LineChart from '../components/LineChart';
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

const {devicesToWatch, propertiesToWatch} = Configs;

console.log(devicesToWatch, propertiesToWatch);

function HomePage(props) {

	const {
		classes
	} = props;

	const attrs = [
		{label: 'Temperatura', factor: 10, digits: 2},
		{label: 'Pressao', factor: 0.5, digits: 2},
		{label: 'Vibracao', factor: 20, digits: 2},
		{label: 'RPM', factor: 150, digits: 0}];

	let [ data, setData ] = useState({[attrs[0].label]: 5, [attrs[1].label]: 5, [attrs[2].label]: 5, [attrs[3].label]: 5});
	let [ devicesData, setDevicesData ] = useState({})

	let [ propertiesData, setPropertiesData ] = useState({});

	let [ isEmulatorRunning, setEmulatorIsRunning ] = useState(false);

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
					setEmulatorIsRunning(true);
				} else {
					// Send notification: snackbar
				}
			});
		}
	}

	const handleDeviceData = (data) => {
		let deviceId = data.metadata.deviceid;
		let newData = data.attrs;

		console.log('Device', deviceId, 'sent data', newData);
//		let device = devicesData[deviceId] || {};
		let deviceData = devicesData[deviceId] || {};
//		console.log('DeviceData was', deviceData);

		Object.keys(newData).forEach(dataId => {
			let dataValue = newData[dataId];
			console.log('Adding data', dataValue, 'under key', dataId, 'to device', deviceId);

			let propertyDevices = propertiesData[dataId] || {};
			let deviceEntries = propertyDevices[deviceId] || [];

			deviceEntries.push(dataValue);
			propertyDevices[deviceId] = deviceEntries;
			propertiesData[dataId] = propertyDevices;

			let keyData = deviceData[dataId] || [];
			keyData.push(dataValue);
			deviceData[dataId] = keyData;

		});

		console.log('DeviceData now is', deviceData);
	//	device = deviceData;
		devicesData[deviceId] = deviceData;

		setDevicesData({...devicesData});
		console.log('PROPERPOEA', propertiesData);
		setPropertiesData({...propertiesData});

	}

	let handleSliderChange = (id, value) => {
		console.log('changing slider id', id, 'to', value);
		data[id] = value;
		setData({...data});
	}

	Dojot.onDeviceData(handleDeviceData);

	console.log('DevicesData:', devicesData);

	return (
		<div className={classes.container}>
	 		<div className={classes.manualContentPanel}>
	 			<Card label="Manual">
	 				<RadarChart 
	 					labels={Object.keys(data)}
	 					data={Object.keys(data).map(id => data[id])}
	 				/>
	 	
	 				<Slider
						label={attrs[0].label + ": " + (data[attrs[0].label] * attrs[0].factor).toFixed(attrs[0].digits)}
	 					value={data[attrs[0].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[0].label, val)}
	 				/>
	 				<Slider
					 	label={attrs[1].label + ": " + (data[attrs[1].label] * attrs[1].factor).toFixed(attrs[1].digits)}
	 					value={data[attrs[1].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[1].label, val)}
	 				/>
	 				<Slider
					 	label={attrs[2].label + ": " + (data[attrs[2].label] * attrs[2].factor).toFixed(attrs[2].digits)}
	 					value={data[attrs[2].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[2].label, val)}
	 				/>
	 				<Slider
					 	label={attrs[3].label + ": " + (data[attrs[3].label] * attrs[3].factor).toFixed(attrs[3].digits)}
	 					value={data[attrs[3].label]}
	 					onChange={(e, val) => handleSliderChange(attrs[3].label, val)}
	 				/>
	 	
	 				<Button
	 					onClick={() => {
							const newData = {};
							attrs.forEach((item, index, arr) => {
								newData[item.label] = parseFloat((data[item.label] * item.factor).toFixed(item.digits));
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
					{propertiesToWatch.map(({id}) => {

						let propertyData = propertiesData[id] || {} ;

						console.log('Property data for id', id, 'is', propertyData);
						let data = Object.keys(propertyData).map(deviceId => { return {label: deviceId, data: propertyData[deviceId]} });
	
						console.log('Rendering chart with data:', data);

		 	 			return (
							<div className={classes.lineChartContentPanel}>
							<Card label={id}>
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
