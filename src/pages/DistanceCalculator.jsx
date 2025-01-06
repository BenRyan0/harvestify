import React, { useState } from 'react';

const MapboxDistanceCalculator = () => {
  const [origin, setOrigin] = useState(''); // e.g., "longitude,latitude"
  const [destination, setDestination] = useState(''); // e.g., "longitude,latitude"
  const [distance, setDistance] = useState('');

  const mapboxToken = 'pk.eyJ1IjoiYmVlZWVuIiwiYSI6ImNtNGZ5d2JudjBudzcya3Bwd2ljaGNpazAifQ.POpuQ7CwLUMGKK6W2OWR5Q';
  const baseUrl = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving/';

  const calculateDistance = async () => {
    // Check if both origin and destination are valid coordinates
    if (!/^[-\d.]+,[-\d.]+$/.test(origin) || !/^[-\d.]+,[-\d.]+$/.test(destination)) {
      alert('Invalid coordinate format! Use "lng,lat" (e.g., -122.42,37.78).');
      return;
    }

    try {
      // Construct the URL for the API request
      const url = `${baseUrl}${origin};${destination}?sources=0&access_token=${mapboxToken}`;

      // Fetch the data from Mapbox API
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        // Extract distance from the response data
        const distanceInMeters = data.distances[0][1];
        // Convert distance from meters to kilometers
        setDistance((distanceInMeters / 1000).toFixed(2) + ' km');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetching distance data:', error);
      alert('Failed to calculate distance. Check console for more details.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Mapbox Distance Calculator</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Origin (lng,lat): </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="e.g., -122.42,37.78"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Destination (lng,lat): </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., -122.45,37.91"
        />
      </div>
      <button onClick={calculateDistance}>Calculate Distance</button>

      {distance && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Distance:</strong> {distance}</p>
        </div>
      )}
    </div>
  );
};

export default MapboxDistanceCalculator;
