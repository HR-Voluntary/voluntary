import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import facilitiesData from './data/healthcarefacilities.js';
import styles from './Map.module.css';


const MapListing = ({ mapParams }) => {
  // const [viewState, setViewState] = useState(mapParams.mapBounds);
  const [viewState, setViewState] = useState({
    bounds: mapParams.mapBounds
  });
  const [selectedFacility, setSelectedFacility] = useState(null);

  // const [viewState, setViewState] = useState({
  //   latitude: userLocation[0],
  //   longitude: userLocation[1],
  //   zoom: 12,
  // });

  // const sampleview = { longitude: 120.9605, latitude: 23.6978, zoom: 12 };
  // const sampleview = { bounds: [[-73.9876, 40.7661], [-73.9397, 40.8002]] }; // [[long, lat], [long, lat]]

  // useEffect(() => {
  //   setViewState({
  //     latitude: userLocation[0],
  //     longitude: userLocation[1],
  //     zoom: 12,
  //   })
  // }, [userLocation])

  useEffect(() => {
    setViewState({
      bounds: mapParams.mapBounds
    });
  }, [mapParams])

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
        {...viewState}
        // bounds={viewState}
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
        <ScaleControl />
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