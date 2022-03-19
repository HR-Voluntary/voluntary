import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Listing from './Listing.js';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [load, setLoad] = useState(false);

  useEffect(() => {
    getListings()
  }, [load])

  const getListings = () => {
    axios.get('/item/all')
      .then(response => {
        setAllListings(response.data)
        setLoad(true)
      })
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