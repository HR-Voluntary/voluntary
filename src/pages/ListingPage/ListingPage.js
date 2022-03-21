import React, {useState, useEffect} from 'react';
//import MapListing from './Map/Map.js';
import FilterBar from './FilterBar.js';
import axios from 'axios';
import Listing from './Listing.js';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [filterListing, setFilterListing] = useState([]);
  // state signifying distance

  useEffect(() => {
    getListings()
  }, [])

  useEffect(() => {
    getListings()
  }, [])

  // useEffect(() => {
    // save user location
  // }, [])

  const getListings = () => {
    axios.get('http://localhost:3000/user/all')
      .then(response => {
        //calculate distance from current user
        //sort by default distance

        const userData = response.data;
        //console.log(userData);
        let itemsForSale = [];
        userData.forEach(user => {
          itemsForSale = itemsForSale.concat((user.userItems.map(item => {
            item.trustScore = user.trustScore;
            item.sellerName = user.name;
            return item;
          })))
        })
        //console.log(itemsForSale)
        setAllListings(itemsForSale)
        setFilterListing(itemsForSale)
      })
  }

  const filterListingsByCategory = (listings, filterParam) => {
    let filtered = listings.filter(listing => {
      if (listing.category === filterParam) {
        return listing;
      }
    })
      //console.log(filtered);
    setFilterListing(filtered);
    if (filterParam === 'default') {
      setFilterListing(allListings)
    }
  }

  const categoryFilterChange = (e) => {
    //console.log(e.target.value);

    filterListingsByCategory(allListings, e.target.value)
  }

  const filterListingsByTrust = (listings, filterParam) => {
    let filter = listings.filter((listing) => {
      if (listing.trustScore === parseInt(filterParam)) {
        return listing;
      }
      //sellers trust level equals filterParam
    })
    setFilterListing(filter);
    if (filterParam === 'defaultTrust') {
      setFilterListing(allListings)
    }
  }

  const trustFilterChange = (e) => {
    //console.log(e.target.value);

    filterListingsByTrust(allListings, e.target.value)
  }

  // axios calls
  // state/states with array of data
  // filtering functions
  // save user location- TBD
  // onClick functions to navigate to individual product page



  // function to calculate distance based on lat/long

  return (
    <>
      <div>Listing Page</div>
      <FilterBar categoryFilterChange={categoryFilterChange} trustFilterChange={trustFilterChange}/>

      <div className="all-listings">
      {filterListing.map(listing => {
        return <Listing listing={listing}/>
      })}
      </div>
    </>
  )

};

export default ListingPage;