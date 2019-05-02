import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileSelector from '../components/FileSelector';
import Card from '../components/Card';
import Slider from '../components/Slider';
import RadarChart from '../components/RadarChart';
import LineChart from '../components/LineChart';
import Button from '../components/Button';
import { sendMessage, startEmulator, stopEmulator } from '../utils/Emulator';
import Dojot from '../utils/Dojot';
import Configs from '../configs';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import StartIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

const styles = {
  container: {
		display: 'flex',
		flexDirection: 'row',
		flexFlow: 'wrap',
	},
	contentPanel: {
		flex: 1,
		width: '600px',
	},
};

const {devicesToWatch, propertiesToWatch} = Configs;

console.log(devicesToWatch, propertiesToWatch);

function HomePage(props) {

	const {
		classes
	} = props;

	let [ data, setData ] = useState({var1: 5, var2: 5, var3: 5, var4: 5});
	let [ devicesData, setDevicesData ] = useState({})

	let [ isEmulatorRunning, setEmulatorIsRunning ] = useState(false);

	let toggleEmulator = () => {
		if(isEmulatorRunning) {
			stopEmulator().then(setEmulatorIsRunning(false));
		} else {
			startEmulator().then(setEmulatorIsRunning(true));
		}
	}

	const handleDeviceData = (data) => {
		let deviceId = data.metadata.deviceid;
		let newData = data.attrs;

		console.log('Device', deviceId, 'sent data', newData);
//		let device = devicesData[deviceId] || {};
		let deviceData = devicesData[deviceId] || {};
		console.log('DeviceData was', deviceData);

		Object.keys(newData).forEach(dataId => {
			let dataValue = newData[dataId];
			console.log('Adding data', dataValue, 'under key', dataId);
			let keyData = deviceData[dataId] || [];
			keyData.push(dataValue);
			deviceData[dataId] = keyData;
		});

		console.log('DeviceData now is', deviceData);
	//	device = deviceData;
		devicesData[deviceId] = deviceData;

		setDevicesData({...devicesData});

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
	 		<div className={classes.contentPanel}>
	 			<Card label="Manual">
	 				<RadarChart 
	 					labels={Object.keys(data)}
	 					data={Object.keys(data).map(id => data[id])}
	 				/>
	 	
	 				<Slider
	 					value={data.var1}
	 					onChange={(e, val) => handleSliderChange('var1', val)}
	 				/>
	 				<Slider
	 					value={data.var2}
	 					onChange={(e, val) => handleSliderChange('var2', val)}
	 				/>
	 				<Slider
	 					value={data.var3}
	 					onChange={(e, val) => handleSliderChange('var3', val)}
	 				/>
	 				<Slider
	 					value={data.var4}
	 					onChange={(e, val) => handleSliderChange('var4', val)}
	 				/>
	 	
	 				<Button
	 					onClick={() => sendMessage(data)}
	 				>
	 					Enviar
	 				</Button>
	 			</Card>
	 		</div>

	 		<div className={classes.contentPanel}>
	 			<Card label="Automático">

	 				<IconButton
						onClick={() => toggleEmulator()}
	 				>
	 					{isEmulatorRunning ? <StopIcon /> : <StartIcon />}
	 				</IconButton>

					{devicesToWatch.map(({id, attrs}) => {

						let deviceData = devicesData[id] || {} ;
						console.log('On DEVICE DATA', id, ':', deviceData, 'and attrs', attrs);
	
		 	 			return (
							<Card label={`Dipositivo ${id}`}>
							{attrs.map((attrId) => {
								let attrData = deviceData[attrId] || [];
								console.log('LOADED ATTRS DATA', attrData);
								return (
									<Card label={attrId}>
					 	 				<LineChart
					 	 					data={attrData}
					 	 				/>
					 	 			</Card>
								);
							})}
	
			 	 			</Card>
						);
					})}


	 			</Card>
	 		</div>
		</div>
	);
}

export default withStyles(styles)(HomePage);
