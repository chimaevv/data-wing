import React, { useState, useEffect } from 'react';

function FlightSelector() {
  const [flights, setFlights] = useState([]);  // State to hold flight data

  useEffect(() => {
    // Step 3: Fetch flight data from OpenSky API
    fetch('https://opensky-network.org/api/states/all')
      .then(response => response.json())  // Convert the response to JSON
      .then(data => {
        // Step 4: Process the API data
        const flightData = data.states.map((flight, index) => ({
          id: index,  // Use index as a temporary key
          flight_name: flight[1],  // Flight callsign (index 1 in response array)
          latitude: flight[6],     // Latitude (index 6 in response array)
          longitude: flight[5],    // Longitude (index 5 in response array)
          altitude: flight[13],    // Altitude (index 13 in response array)
        }));
        setFlights(flightData);  // Store processed flight data in state
      })
      .catch(error => console.error('Error fetching flight data:', error));  // Handle errors
  }, []);

  // Step 5: Display the fetched data in a dropdown
  return (
    <div>
      <h2>Select a Flight</h2>
      <select>
        {flights.map(flight => (
          <option key={flight.id} value={flight.id}>
            {flight.flight_name} - Altitude: {flight.altitude}m
          </option>
        ))}
      </select>
    </div>
  );
}

export default FlightSelector;
