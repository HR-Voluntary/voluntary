import React from 'react';


const Listing = ({listing}) => {
  return (
    <div className="indiv-listing">
      <img className="listing-image" src={listing.image} alt=""></img>
      <span className="listing-loc">{listing.location}</span>
      <span className="listing-descp">{listing.description}</span>
      <span className="seller-trust-score">{listing.trustScore}</span>
      <span className="seller-name">{listing.sellerName}</span>
      <span className="listing-category">{listing.category}</span>
    </div>
  )
};

export default Listing;


