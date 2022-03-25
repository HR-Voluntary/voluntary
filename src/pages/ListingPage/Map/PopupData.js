import React from 'react';
import distance from '@turf/distance';
import styles from './Map.module.css';

const PopupData = ({ userLoc, selectedListing, changeHighlightedListing }) => {
  const dist = Math.floor(distance([userLoc.latitude, userLoc.longitude], selectedListing.location, { units: 'kilometers' }));

  return (
    <>
      {(dist < 1) && (
        <div className={styles.popupInfo}>
        <div className={styles.popupImgContainer}>
          <img className={styles.popupImg} src={selectedListing.image} alt="" />
        </div>
        <div className={styles.popupImgTextContainer}>
          <h2 className={styles.h2} onClick={() => changeHighlightedListing(selectedListing.id)}><a className={styles.popUpListingTitle} href={`#${selectedListing.id}`}>{selectedListing.name}</a></h2>
          <div className={styles.category}>{selectedListing.category}</div>
          <div className={styles.donator}>
            <span>{`${selectedListing.sellerName} | `}</span>
            <span className={styles.trust}>{`Trust (${selectedListing.trustScore}/4)`}</span>
          </div>
          <div><i>{`Approx. less than 1 km away`}</i></div>
        </div>
      </div>
      )}
      {(dist === 1) && (
        <div className={styles.popupInfo}>
        <div className={styles.popupImgContainer}>
          <img className={styles.popupImg} src={selectedListing.image} alt="" />
        </div>
        <div className={styles.popupImgTextContainer}>
          <h2 className={styles.h2} onClick={() => changeHighlightedListing(selectedListing.id)}><a className={styles.popUpListingTitle} href={`#${selectedListing.id}`}>{selectedListing.name}</a></h2>
          <div className={styles.category}>{selectedListing.category}</div>
          <div className={styles.donator}>
            <span>{`${selectedListing.sellerName} | `}</span>
            <span className={styles.trust}>{`Trust (${selectedListing.trustScore}/4)`}</span>
          </div>
          <div><i>{`Approx. 1 km away`}</i></div>
        </div>
      </div>
      )}
      {(dist > 1) && (
        <div className={styles.popupInfo}>
          <div className={styles.popupImgContainer}>
            <img className={styles.popupImg} src={selectedListing.image} alt="" />
          </div>
          <div className={styles.popupImgTextContainer}>
            <h2 className={styles.h2} onClick={() => changeHighlightedListing(selectedListing.id)}><a className={styles.popUpListingTitle} href={`#${selectedListing.id}`}>{selectedListing.name}</a></h2>
            <div className={styles.category}>{selectedListing.category}</div>
            <div className={styles.donator}>
              <span>{`${selectedListing.sellerName} | `}</span>
              <span className={styles.trust}>{`Trust (${selectedListing.trustScore}/4)`}</span>
            </div>
            <div><i>{`Approx. ${dist} kms away`}</i></div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopupData;