import React from 'react';
import styles from './listingStyle.module.css';
import { useNavigate } from 'react-router';

const Listing = ({ listing, highlightedListing }) => {

  const navigate = useNavigate();
  const navigateToProductPage = () => {
    navigate('/ProductPage', {
      state: { productId: listing.id }
    });
  }

  // console.log(highlightedListing);

  return (
    <div id={listing.id} className={listing.id === highlightedListing ? styles.highlightListing : styles.indivListing}>
      <div className={styles.imageContainer}>
        <img className={styles.listingImage} src={listing.image} alt=""></img>
      </div>
      <div className={styles.indivListingRight}>
        <h2 id={styles.listingName} className="listing-category" onClick={navigateToProductPage}>{listing.name}</h2>
        <span className="listing-category"><b>Category:</b> {listing.category}</span>
        <span className="seller-name"><b>Donator:</b> {listing.sellerName}</span>
        <span className="seller-trust-score"><b>Trust Score:</b> {listing.trustScore}</span>
        <span className="listing-descp"><b>Descripton:</b> {listing.description}</span>

      </div>
    </div>
  )
};

export default Listing;


