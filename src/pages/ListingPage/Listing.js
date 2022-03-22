import React from 'react';
import styles from './listingStyle.module.css';

const Listing = ({listing}) => {
  return (
    <div className={styles.indivListing}>
      <img className="listing-image" src={listing.image} alt=""></img>
      <div className={styles.indivListingRight}>
        <span className="listing-loc">Location: {listing.location}</span>
        <span className="listing-descp">Descripton: {listing.description}</span>
        <span className="seller-trust-score">Seller Trust Score: {listing.trustScore}</span>
        <span className="seller-name">Seller: {listing.sellerName}</span>
        <span className="listing-category">Category: {listing.category}</span>
      </div>
    </div>
  )
};

export default Listing;


