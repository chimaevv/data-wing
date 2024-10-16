import React, { useState, useEffect } from 'react';

function FlightSelector({ onFlightSelect }) {
  const [flights, setFlights] = useState([]);  
  const [errorMessage, setErrorMessage] = useState('');  

  useEffect(() => {
    console.log('Fetching flight data from OpenSky API...');

   
    fetch('https://opensky-network.org/api/states/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Flight data fetched:', data);  
        if (data && data.states) {
          const flightData = data.states.map((flight, index) => ({
            id: index,  
            flight_name: flight[1] || 'Unknown',  //  (index 1 in response array)
            latitude: flight[6],     // latitude (index 6 in response array)
            longitude: flight[5],    // longitude (index 5 in response array)
            altitude: flight[13],    // altitude (index 13 in response array)
          }));
          setFlights(flightData);  // store processed flight data in state
        } else {
          setFlights([]);  // no flights available
        }
      })
      .catch(error => {
        console.error('Error fetching flight data:', error);
        setErrorMessage('Failed to fetch flight data');
      });
  }, []);

 
  const handleFlightSelect = (event) => {
    const selectedFlightId = event.target.value;
    const selectedFlight = flights.find(flight => flight.id === parseInt(selectedFlightId));
    onFlightSelect(selectedFlight);
  };

  return (
    <div>
      <h2>Flight Data</h2>
      {/* Error message display */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      {/* Dropdown for flight selection */}
      <select onChange={handleFlightSelect}>
        <option value="">Select a flight</option>
        {flights.length > 0 ? (
          flights.map(flight => (
            <option key={flight.id} value={flight.id}>
              {flight.flight_name} - Altitude: {flight.altitude}m
            </option>
          ))
        ) : (
          <option value="">No flights available</option>
        )}
      </select>
    </div>
  );
}

export default FlightSelector;
