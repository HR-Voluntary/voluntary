import React from 'react';
import distance from '@turf/distance';

const PopupData = ({ userLoc, selectedListing }) => {
  const dist = Math.floor(distance([userLoc.latitude, userLoc.longitude], selectedListing.location, { units: 'kilometers' }));

  return (
    <>
      {(dist < 1) && (
        <div>
          <h2>{selectedListing.name}</h2>
          <div>{`Category: ${selectedListing.category}`}</div>
          <div>{`Donator: ${selectedListing.sellerName}`}</div>
          <div>{`Description: ${selectedListing.description}`}</div>
          <div>{`Approximately less than 1 km away`}</div>
          {/* small image? */}
        </div>
      )}
      {(dist === 1) && (
        <div>
          <h2>{selectedListing.name}</h2>
          <div>{`Category: ${selectedListing.category}`}</div>
          <div>{`Donator: ${selectedListing.sellerName}`}</div>
          <div>{`Description: ${selectedListing.description}`}</div>
          <div>{`Approximately 1 km away`}</div>
          {/* small image? */}
        </div>
      )}
      {(dist > 1) && (
        <div>
          <h2>{selectedListing.name}</h2>
          <div>{`Category: ${selectedListing.category}`}</div>
          <div>{`Donator: ${selectedListing.sellerName}`}</div>
          <div>{`Description: ${selectedListing.description}`}</div>
          <div>{`Approximately ${dist} kms away`}</div>
          {/* small image? */}
        </div>
      )}
    </>
  )
}

export default PopupData;