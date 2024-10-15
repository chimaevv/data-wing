import React, { useState, useEffect } from 'react';

function TestOpenSkyAPI() {
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    fetch('https://opensky-network.org/api/states/all')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check if data is returned in the console
        setFlightData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Testing OpenSky API</h2>
      {flightData ? <pre>{JSON.stringify(flightData, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default TestOpenSkyAPI;
