export default {

	manualDeviceId: "b94ca5",

	devicesToEmulate: [
		{id: "689101", dataFile: "/usr/src/app/data/pred_01.csv"},
		{id: "dcf02b", dataFile: "/usr/src/app/data/pred_02.csv"},
	],
	
	devicesToWatch: [
		{ id: '90a144', attrs: ['temperatura', 'pressao'] },
		{ id: '90a144', attrs: ['temperatura'] },
	],

	propertiesToWatch: [
		{id: 'Temperatura', deviceIds: ['689101', 'dcf02b']},
		{id: 'Pressao', deviceIds: ['689101', 'dcf02b']},
		{id: 'Vibracao', deviceIds: ['689101', 'dcf02b']},
		{id: 'RPM', deviceIds: ['689101', 'dcf02b']}
	],

	dojotHost : 'http://localhost:8000',

	jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFRmFnaldmVmJsMlhZR0NBeG13bk8yVTBBelB4dGIyZyIsImlhdCI6MTU1Njc0NDcxMCwiZXhwIjoxNTU2NzQ1MTMwLCJuYW1lIjoiQWRtaW4gKHN1cGVydXNlcikiLCJlbWFpbCI6ImFkbWluQG5vZW1haWwuY29tIiwicHJvZmlsZSI6ImFkbWluIiwiZ3JvdXBzIjpbMV0sInVzZXJpZCI6MSwianRpIjoiY2NjZjNkZjM0Mjc5MWJhZDJjMjcyNzVkODYyYjBjYjAiLCJzZXJ2aWNlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.ztkiHprLqht6A2brzyH36N_Nv_2-6p9K2ZIz5FveuSI',
}
