import React, { useEffect, useRef } from 'react';
import '../styles/style.css'; // Make sure your CSS file path is correct

function FlightMap({ selectedFlight }) {
  const mapRef = useRef(null);  // Reference to the map div
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;  // Your Google Maps API key from .env

  useEffect(() => {
    // Define the custom dark mode styling inside useEffect
    const darkModeStyle = [
      { elementType: 'geometry', stylers: [{ color: '#212121' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#373737' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8a8a8a' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#3d3d3d' }],
      },
    ];

    const loadGoogleMaps = () => {
      // Initialize the Google map with dark mode styles
      const map = new window.google.maps.Map(mapRef.current, {
        center: selectedFlight ? { lat: selectedFlight.latitude, lng: selectedFlight.longitude } : { lat: 51.505, lng: -0.09 }, // Use selected flight or default
        zoom: 5, // Default zoom level
        styles: darkModeStyle,  // Apply custom dark mode styles
      });

      // Custom white airplane icon
      const airplaneIcon = {
        url: 'https://img.icons8.com/ios-filled/50/ffffff/airplane-take-off.png', // White airplane icon URL
        scaledSize: new window.google.maps.Size(50, 50), // Resize the icon
      };

      // Add a marker for the selected flight or default location
      new window.google.maps.Marker({
        position: selectedFlight ? { lat: selectedFlight.latitude, lng: selectedFlight.longitude } : { lat: 51.505, lng: -0.09 },  // Example coordinates or selected flight
        map,
        title: selectedFlight ? `Flight: ${selectedFlight.flight_name}` : 'Flight Location',
        icon: airplaneIcon,  // Use the white airplane icon
      });
    };

    // Check if Google Maps is already loaded
    if (!window.google) {
      console.log('Google Maps script not found, adding script...');

      // Create and append the Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Once the script is loaded, initialize the map
      script.onload = () => {
        console.log('Google Maps script loaded successfully');
        loadGoogleMaps();
      };
    } else {
      console.log('Google Maps script already loaded');
      loadGoogleMaps();
    }
  }, [apiKey, selectedFlight]);  // Run when selectedFlight changes or on initial load

  return (
    <div>
      <h2>Flight Map</h2>
      {/* Map container */}
      <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }}>
        Loading map...
      </div>
    </div>
  );
}

export default FlightMap;
