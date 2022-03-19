import React, {useState, useEffect} from 'react';
import MapListing from './Map/Map.js';
import FilterBar from './FilterBar.js';
import axios from 'axios';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [filterListing, setFilterListing] = useState([]);
  // state signifying distance


  useEffect(() => {
    getListings()
  }, [])

  // useEffect(() => {
    // save user location
  // }, [])

  const getListings = () => {
    axios.get('http://localhost:3000/item/all')
      .then(response => {
        //calculate distance from current user
        //sort by default distance
        setAllListings(response.data)
      })
  }

  const filterListingsByCategory = (listings, filterParam) => {
    const filter = listings.filter(listing =>
      listing.cateogry === filterParam
    )

    setFilterListing(filter);
  }

  const categoryFilterChange = (e) => {
    console.log(e.target.value);
    filterListingsByCategory(allListings, e.target.value)
  }

  // const filterListingsByTrust = (listings, filterParam) => {
  //   const filter = listings.filter((listing) => {

  //     //sellers trust level equals filterParam
  //   })
  //   setFilterListing(filter);
  // }

  // const trustFilterChange = (value) => {
  //   filterListings(allListings, value)
  // }

  // axios calls
  // state/states with array of data
  // filtering functions
  // save user location- TBD
  // onClick functions to navigate to individual product page



  // function to calculate distance based on lat/long

  return (
    <>
      <div>Listing Page</div>
      <FilterBar categoryFilterChange={categoryFilterChange}/>
      <MapListing />
      {/* pass in stat signifiying initial distance filter */}
    </>
  )

};

export default ListingPage;