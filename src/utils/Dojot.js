import Dojot from '@znti/dojot-web';
import Configs from '../configs';

const dojot = new Dojot();


let jwt = Configs.jwt;

let Devices;

let _dataCallback = () => {};
let onDeviceData = (callback) => {
	_dataCallback = callback;
};

dojot.configure({host: Configs.dojotHost}).then(configuredClient => {
	// The client is now pointing to the specified dojot host.
	// All thats left is to provide some credentials.

	let auth;
	if(jwt) {
		auth = configuredClient.initializeWithToken(jwt);
	} else {
		auth = configuredClient.initializeWithCredentials('admin', 'admin');
	}
		
	auth.then(initializedClient => {
		// From here on, you can use the helpers this library has
		Devices = configuredClient.Devices;
		Devices.onDeviceData(_dataCallback);
	
		console.log('Setting a listener');
	}).catch(console.error);
	
}).catch(console.error);

export default {
	onDeviceData,
};
