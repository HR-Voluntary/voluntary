import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import facilitiesData from './data/healthcarefacilities.js';
import styles from './Map.module.css';


const MapListing = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

  const [selectedFacility, setSelectedFacility] = useState(null);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
  }

  // const error = () => {
  //   status.textContent = 'Unable to retrieve your location';
  // }

  navigator.geolocation.getCurrentPosition(success);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedFacility(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, []);

  return (
    <div>
      <small className={styles.sampletext}>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        <Map
          initialViewState={{ ...viewport }}
          style={{
            width: '85vw',
            height: '85vh',
            margin: 'auto',
            border: 'solid',
            borderColor: 'black'
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {facilitiesData.data.map((facility) => (
            <Marker
              key={facility[0]}
              latitude={facility[13][1]}
              longitude={facility[13][2]}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedFacility(facility)
                }}
                style={{ width: '50px', height: '50px' }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/390px-Map_marker.svg.png?20150513095621" alt="facility" style={{ width: '15px', height: '32px' }} />
              </button>
            </Marker>
          ))}

          {selectedFacility && (
            <Popup
              latitude={selectedFacility[13][1]}
              longitude={selectedFacility[13][2]}
              closeOnClick={false}
              onClose={() => {
                setSelectedFacility(null)
              }}
            >
              <div>
                <h2>{selectedFacility[10]}</h2>
                <p>{selectedFacility[13][0]}</p>
              </div>
            </Popup>
          )}
        </Map>
    </div>
  )
};

export default MapListing;