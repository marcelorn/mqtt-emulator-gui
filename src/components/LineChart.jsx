import React from 'react';
import {Line} from 'react-chartjs-2';

function LineChart(props) {
	
	const {
		//labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		data = [1, 3, 5, 7, 4, 5],
	} = props;

	return (
		<Line
			data={{
		    labels: data.map(() => 'Valores'),
		    datasets: [
			    {
						label: 'Valor',
			      data: data,
		      	borderWidth: 1
		    	},	
				]
		  }}
		  options={{
				legend: {
						display: true
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
