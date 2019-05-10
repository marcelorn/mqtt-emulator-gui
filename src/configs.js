export default {

	manualDeviceId: "4b25a",

	devicesToWatch: [
		{ id: 'b74fd4', label:'Equipamento 1', lineColor: 'Red', dataFile: "/usr/src/app/data/pred_01.csv"},
		{ id: '73456c', label:'Equipamento 2', lineColor: 'Blue', dataFile: "/usr/src/app/data/pred_02.csv"},
		{ id: '182745', label:'Equipamento 3', lineColor: 'Green', dataFile: "/usr/src/app/data/pred_03.csv"},
		{ id: '5441ce', label:'Equipamento 4', lineColor: 'Yellow', dataFile: "/usr/src/app/data/pred_04.csv"},
		{ id: '9275dc', label:'Equipamento 5', lineColor: 'Purple', dataFile: "/usr/src/app/data/pred_05.csv"},
		{ id: '92f3d7', label:'Equipamento 6', lineColor: 'Olive', dataFile: "/usr/src/app/data/pred_06.csv"},
		{ id: '73ed82', label:'Equipamento 7', lineColor: 'Orange', dataFile: "/usr/src/app/data/pred_07.csv"},
		{ id: 'd2af2', label:'Equipamento 8', lineColor: 'MAGENTA', dataFile: "/usr/src/app/data/pred_08.csv"},
		{ id: 'b0a7f2', label:'Equipamento 9', lineColor: 'DARKCYAN', dataFile: "/usr/src/app/data/pred_09.csv"},
		{ id: '4b25a', label:'Equipamento M', lineColor: 'BROWN' },
	],
/*
	manualDeviceId: "6c6fa2",

	devicesToWatch: [
		{ id: '370044', label:'Equipamento 1', lineColor: 'Red', dataFile: "/usr/src/app/data/pred_01.csv"},
		{ id: '7d6e02', label:'Equipamento 2', lineColor: 'Blue', dataFile: "/usr/src/app/data/pred_02.csv"},
		{ id: 'c5702a', label:'Equipamento 3', lineColor: 'Purple', dataFile: "/usr/src/app/data/pred_03.csv"},
		{ id: '6c6fa2', label:'Equipamento M', lineColor: 'Green' },
	],
*/
	propertiesToWatch: ['temperatura', 'pressao', 'vibracao', 'rpm'],

	dojotHost: 'http://gcpdtc01:8000',

	path: "/mqtt-emulator-app",

	jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJRYzdOb0lqZEIwTHZ4YTNtZjhhUjFaNnFSVk1kRmtURiIsImlhdCI6MTU1NzE0NjcxNywiZXhwIjoxNTU3MTQ3MTM3LCJuYW1lIjoiQWRtaW4gKHN1cGVydXNlcikiLCJlbWFpbCI6ImFkbWluQG5vZW1haWwuY29tIiwicHJvZmlsZSI6ImFkbWluIiwiZ3JvdXBzIjpbMV0sInVzZXJpZCI6MSwianRpIjoiOWI2Zjk5ZDhjNjk2MzFjZmNjODcxMGY1ODc0NWQyYmQiLCJzZXJ2aWNlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.xNWLXk7Jvr0qzZN-fEnBnliVUWUZOqx_EnHGTtq18dY',
	//jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1NHhuSlQxMVNDZG5ZQVN2ZjNST24zUGsyRExBSDJIbyIsImlhdCI6MTU1Njk3NjQxMywiZXhwIjoxNTU2OTc2ODMzLCJuYW1lIjoiQWRtaW4gKHN1cGVydXNlcikiLCJlbWFpbCI6ImFkbWluQG5vZW1haWwuY29tIiwicHJvZmlsZSI6ImFkbWluIiwiZ3JvdXBzIjpbMV0sInVzZXJpZCI6MSwianRpIjoiZjExMzU3MTQyZDk3NzBkMWY5MmRhMDQ5NGM4NzQyZTQiLCJzZXJ2aWNlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.JJZPPrOAOvwpGIYstfY2XHssqoCKfGKYdXlHeN8NlGA',
}
