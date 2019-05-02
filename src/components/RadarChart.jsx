import React from 'react';
import {Radar} from 'react-chartjs-2';

function RadarChart(props) {
	
	const {
		labels = ['a','b','c','d'],
		data = [5,5,5,5],
	} = props;

	return (
		<Radar 
			data={{
	      labels: labels,
 	     datasets: [{
 	       label: "",
 	       fill: true,
 	       backgroundColor: "rgba(0,150,136,0.5)",
 	       borderColor: "#009688",
 	       pointBorderColor: "#fff",
 	       pointBackgroundColor: "#009688",
 	       data: data
      	}]
    	}}

    options={{
      title: {
        display: true
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      responsive: true,
      maintainAspectRatio: true,
      scale: {
          ticks: {
              beginAtZero: true,
							max: 10,
							display: false
          }
      }
    }}
		/>
	);
}

export default RadarChart;
