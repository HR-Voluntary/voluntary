import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, ScaleControl } from 'react-map-gl';
import PopupData from './PopupData.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import distance from '@turf/distance';
// import facilitiesData from './data/healthcarefacilities.js';
import styles from './Map.module.css';


const MapListing = ({ userLocation, filterListing }) => {
  // const [viewState, setViewState] = useState(mapParams.mapBounds);
  // const [viewState, setViewState] = useState({
  //   bounds: mapParams.mapBounds
  // });

  const [viewState, setViewState] = useState({
    latitude: userLocation[0],
    longitude: userLocation[1],
    zoom: 12,
  });

  const [userLoc, setUserLoc] = useState({
    latitude: userLocation[0],
    longitude: userLocation[1],
  });

  const [selectedListing, setSelectedListing] = useState(null);

  // console.log(filterListing);

  // const sampleview = { longitude: 120.9605, latitude: 23.6978, zoom: 12 };
  // const sampleview = { bounds: [[-73.9876, 40.7661], [-73.9397, 40.8002]] }; // [[long, lat], [long, lat]]

  useEffect(() => {
    setViewState({
      latitude: userLocation[0],
      longitude: userLocation[1],
      zoom: 12,
    })
    setUserLoc({
      latitude: userLocation[0],
      longitude: userLocation[1],
    })
  }, [userLocation])

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedListing(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, []);

  return (
    <Map
      {...viewState}
      // bounds={viewState}
      onMove={evt => setViewState(evt.viewState)}
      // style={{
      //   width: '100%',
      //   height: '100%',
      //   margin: 'auto',
      //   border: 'solid',
      //   borderColor: 'black'
      // }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <ScaleControl />
      {filterListing.map((listing) => {
        // if (listing.location) {
        if (Array.isArray(listing.location)) {
          return (
            <Marker
              // key={listing[0]}
              latitude={listing.location[0]}
              longitude={listing.location[1]}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedListing(listing)
                }}
                className={styles.markerbtn}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/390px-Map_marker.svg.png?20150513095621" alt="location" style={{ width: '20px', height: '32px' }} />
              </button>
            </Marker>
          )
        }
      })}

      {userLoc.latitude && (
        <Marker
          latitude={userLoc.latitude}
          longitude={userLoc.longitude}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/390px-Map_marker.svg.png?20150513095621" alt="location" style={{ width: '32px', height: '48px' }} />
        </Marker>
      )}


      {selectedListing && (
        <Popup
          latitude={selectedListing.location[0]}
          longitude={selectedListing.location[1]}
          closeOnClick={false}
          onClose={() => {
            setSelectedListing(null)
          }}
        >
          <PopupData
            userLoc={userLoc}
            selectedListing={selectedListing}
          />
        </Popup>
      )}
    </Map>
  )
};

export default MapListing;