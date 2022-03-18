import React from 'react';
import axios from 'axios';
import Listing from './Listing.js';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([])

  const getListings = () => {
    axios.get()
  }

  return (
    <div>
      <h1>Listing Page</h1>
      {allListings.map(listing => {
        return <Listing listing={listing}/>
      })}
    </div>
  )
};

export default ListingPage;