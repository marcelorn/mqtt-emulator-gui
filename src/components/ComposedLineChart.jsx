import React from 'react';
import {Line} from 'react-chartjs-2';

function LineChart(props) {
	
	const {
		label = "Valores", 
		data = {},
	} = props;

	let datasets = data || []; 

	let maxLength = 0;

	datasets.forEach(ds => {
		let dsData = ds.data || []
		if(dsData.length > maxLength) {
			maxLength = dsData.length;
		}
	});

	return (
		<Line
			data={{
		    labels: (new Array(maxLength)).map(() => "OK"),
				datasets,
//				datasets: [
//					{ label: 'device01', data: [1,2,3,4] },
//					{ label: 'device02', data: [4,3,2,1] },
//				],
		  }}
		  options={{

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
			}}
		/>
	);
}

export default LineChart;
