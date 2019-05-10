import React from 'react';
import {Line} from 'react-chartjs-2';

function LineChart(props) {
	//console.log('LineChart: props=', props);
	const {
		label = "Valores", 
		data = {},
	} = props;

	const datasets = data || []; 

	let maxLength = 0;

	datasets.forEach(ds => {
		let dsData = ds.data || []
		if(dsData.length > maxLength) {
			maxLength = dsData.length;
		}
	});
	
	//console.log('LineChart: datasets=', datasets, 'maxLength=', maxLength);

	const chartData = {
		labels: new Array(maxLength),
		datasets: datasets
	}

	const options = {
		legend: {
			display: false
		},
		scales: {
			yAxes: [{
				ticks: {
					reverse: false
				}
			}]
		}
	}

	console.log(`ChartData: data=${JSON.stringify(chartData)} options=${JSON.stringify(options)}`);

	return (
		<Line data={chartData} options={options} redraw/>
	);
}

export default LineChart;
