import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // importing line chart from chartjs
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function FlightCharts({ selectedFlight }) {
  const [chartData, setChartData] = useState(null); // initialize with null to handle edge cases

  useEffect(() => {
    if (selectedFlight) {
      // chart data only if flight is selected
      const data = {
        labels: ['Takeoff', 'Mid-flight', 'Landing'],  
        datasets: [
          {
            label: `${selectedFlight.flight_name} Altitude (m)`,
            data: [0, selectedFlight.altitude / 2, selectedFlight.altitude],  
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 2, 
          },
        ],
      };
      setChartData(data);  
    } else {
      setChartData(null); 
    }
  }, [selectedFlight]); 

  return (
    <div>
      <h2>Flight Altitude Chart</h2>
      {selectedFlight ? (
        chartData ? (
          <Line
            data={chartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Flight Altitude Over Time',
                },
              },
            }}
          />
        ) : (
          <p>Loading chart data...</p>
        )
      ) : (
        <p>Select a flight to view its altitude chart.</p>
      )}
    </div>
  );
}

export default FlightCharts;
