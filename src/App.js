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

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      searchPlaces();
    }
  };
  

  const searchPlaces = () => {
    if (map && searchInput.trim() !== '') {
      const placesService = new window.google.maps.places.PlacesService(map);
      const searchRequest = {
        query: searchInput,
      };
      placesService.textSearch(searchRequest, handleSearchResults);
    }
  };

  const handleSearchResults = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      setPlaces(results);
    }
  };

  return (
    <div>
      <h1>Buscador de Lugares</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Ingrese un lugar"
        />
        <button type="submit">Buscar</button>
      </form>
      <div id="map" style={{ height: '400px', marginTop: '20px' }}></div>
      <div>
      {places.length > 0 && (
        <ul>
          {places.map((place) => (
            <li key={place.place_id}>{place.name}</li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default App;