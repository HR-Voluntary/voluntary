import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import facilitiesData from './data/healthcarefacilities.js';
import styles from './Map.module.css';


const MapListing = ({ userLocation }) => {
  const [viewState, setViewState] = useState({
    latitude: userLocation[0],
    longitude: userLocation[1],
    zoom: 12,
  });

  const [selectedFacility, setSelectedFacility] = useState(null);

  // if (userLocation !== viewport) {
    // setViewPort  = ()
  // }

  useEffect(() => {
    setViewState({
      latitude: userLocation[0],
      longitude: userLocation[1],
      zoom: 12,
    })
  }, [userLocation])

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
        // initialViewState={{ ...viewport }}
        { ...viewState }
        onMove={evt => setViewState(evt.viewState)}
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