import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, ScaleControl } from 'react-map-gl';
import PopupData from './PopupData.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.css';


const MapListing = ({ userLocation, filterListing, changeHighlightedListing }) => {

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
      onMove={evt => setViewState(evt.viewState)}
      style={{
        width: '100%',
        height: '100%',
      }}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <ScaleControl />
      {filterListing.map((listing) => {
        if (Array.isArray(listing.location)) {
          return (
            <div>
              <Marker
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
                  <img
                    src={require("../utils/mapPinV2.1Shadow.png")}
                    alt="location"
                    className={styles.markerimg}
                  />
                </button>
              </Marker>
            </div>
          )
        }
      })}

      {userLoc.latitude && (
        <Marker
          latitude={userLoc.latitude}
          longitude={userLoc.longitude}
        >
          <img
            src={require("../utils/currentLocPinV2.1shadow.png")}
            alt="location"
            style={{ width: '20px', height: 'auto' }}
          />
        </Marker>
      )}

      {selectedListing && (
        <Popup
          latitude={(selectedListing.location[0])}
          longitude={selectedListing.location[1]}

          closeOnClick={false}
          onClose={() => {
            setSelectedListing(null);
            changeHighlightedListing(null);
          }}
        >
          <PopupData
            userLoc={userLoc}
            selectedListing={selectedListing}
            changeHighlightedListing={changeHighlightedListing}
          />
        </Popup>
      )}
    </Map>
  )
};

export default MapListing;