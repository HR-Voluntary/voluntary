import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Listing from './Listing.js';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);

  useEffect(() => {
    getListings()
  }, [])

  const getListings = () => {
    axios.get('http://localhost:3000/item/all')
      .then(response => {
        setAllListings(response.data)
      })
  }

  return (
    <div>
      <h1>Listing Page</h1>
      <div className="all-listings">
      {allListings.map(listing => {
        return <Listing listing={listing}/>
      })}
      </div>
    </div>
  )
};

export default ListingPage;