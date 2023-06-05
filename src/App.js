//Maps
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Cargar el mapa de Google Maps
    const loadMap = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOEH-FZHo_RnidhHMigrUFGvSRseFuTJo&libraries=places`;
      googleMapsScript.onload = initMap;
      document.head.appendChild(googleMapsScript);
    };

    loadMap();
  }, []);

  const initMap = () => {
    // Crear el mapa y establecer los eventos
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    };
    const mapElement = document.getElementById('map');
    const newMap = new window.google.maps.Map(mapElement, mapOptions);
    setMap(newMap);
  };

  return (
    <div>
      <h1>Buscador de Lugares</h1>
      <div id="map" style={{ height: '400px', marginTop: '20px' }}></div>
      {places.length > 0 && (
        <ul>
          {places.map((place) => (
            <li key={place.place_id}>{place.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;