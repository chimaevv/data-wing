import React from 'react';
import FlightSelector from './components/FlightSelector';
import FlightMap from './components/FlightMap';
import FlightCharts from './components/FlightCharts';

function App() {
  return (
    <div className="App">
      <h1>Flight Data Visualization Tool</h1>
      <FlightSelector />
      <FlightMap />
      <FlightCharts />
    </div>
  );
}

export default App;
