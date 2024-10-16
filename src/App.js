import React, { useState } from 'react';
import FlightSelector from './components/FlightSelector';
import FlightMap from './components/FlightMap';
import FlightCharts from './components/FlightCharts';  
import './App.css'; 

function App() {
  const [selectedFlight, setSelectedFlight] = useState(null);  

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);  
  };

  return (
    <div className="App">
      <h1 className="title">Welcome to Data Wing</h1>  {/* Updated title with a class */}
      <FlightSelector onFlightSelect={handleFlightSelect} />
      <FlightMap selectedFlight={selectedFlight} />
      <FlightCharts selectedFlight={selectedFlight} />  {/* Pass selected flight to FlightCharts */}
    </div>
  );
}

export default App;


