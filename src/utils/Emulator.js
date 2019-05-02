import Configs from '../configs';

var mqttTopic = (deviceId) => {
    return `/admin/${deviceId}/attrs`;
}

var getMessage = (deviceId, dataFile) => {  
    return {
        device: {
            autoRestart: false,
            id: deviceId,
            mqttTopic: mqttTopic(deviceId),
            frequency: 5000,
            sensors: [{
                name: "Temperatura",
                value: `FILE(${dataFile}:1)`,
                expression: "file",
                expressionValues: [dataFile, "1"]
            }, {
                name: "Pressao",
                value: `FILE(${dataFile}:2)`,
                expression: "file",
                expressionValues: [dataFile, "2"]
            }, {
                name: "Vibracao",
                value: `FILE(${dataFile}:3)`,
                expression: "file",
                expressionValues: [dataFile, "3"]
            }, {
                name: "RPM",
                value: `FILE(${dataFile}:4)`,
                expression: "file",
                expressionValues: [dataFile, "4"]
            }],
            eventIntervals: [],
            amount: null
        },
        generationType: "expression",
        accelerate: 1
    }
}

export function sendMessage(message) {
//function sendMessage(var1_value, var2_value, var3_value, var4_value) {
//  var var1_value = document.getElementById('var1').value;
//  var var2_value = document.getElementById('var2').value;
//  var var3_value = document.getElementById('var3').value;
//  var var4_value = document.getElementById('var4').value;
//  var message = { var1: var1_value, var2: var2_value, var3: var3_value, var4: var4_value};
  var body = JSON.stringify({topic: mqttTopic(Configs.manualDeviceId), data: message});
  console.log(`Message to be published: ${body}`);
  fetch(`${Configs.dojotHost}/mqtt-emulator/mqtt/publish`, {
      method: 'POST',
      mode: "cors",
      body: body, // string or object
      headers:{
        'Content-Type': 'application/json'
      }
  }).then((response) => response.json())
  .then(myJson => console.log(JSON.stringify(myJson)))
  .catch(() => console.log("Can’t access response. Blocked by browser?"));
}

export function startEmulator() {
    var promises = [];
    Configs.devicesToEmulate.forEach((device, index, arr) => {
        var body = JSON.stringify(getMessage(device.id, device.dataFile));
        console.log(`Start emulator: ${body}`);
        var promise = fetch(`${Configs.dojotHost}/mqtt-emulator/emulator/start`, {
            method: 'POST',
            mode: "cors",
            body: body, // string or object
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then(myJson => {
            console.log(JSON.stringify(myJson))
            return true;
        }).catch(() => {
            console.log("Can’t access response. Blocked by browser?");
            return false;
        });
        promises.push(promise);
    });
    console.log(`Done starting emulators!`);
    return Promise.all(promises);
}

export function stopEmulator() {
    var promises = [];
    Configs.devicesToEmulate.forEach((device, index, arr) => {
        console.log(`Stop emulator for device ${device.id}`);
        var promise = fetch(`${Configs.dojotHost}/mqtt-emulator/emulator/stop`, {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({deviceId: device.id}), // string or object
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then(myJson => {
            console.log(JSON.stringify(myJson));
            return true;
        }).catch(() => {
            console.log("Can’t access response. Blocked by browser?");
            return false;
        });
        promises.push(promise);
    });

    return Promise.all(promises);
}

