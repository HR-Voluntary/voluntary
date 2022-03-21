import React, {useState, useEffect} from 'react';
import MapListing from './Map/Map.js';
import FilterBar from './FilterBar.js';
import axios from 'axios';
import Listing from './Listing.js';
import styles from './listingStyle.module.css';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [filterListing, setFilterListing] = useState([]);
  let [userLocation, setUserLocation] = useState([37.791200, -122.396080]);

  const getUserLoc = () => {
    // after checking yelp, it seems like it's up to the user to manually change their decision about location sharing
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setUserLocation([latitude, longitude]);
    }

    const error = (error) => {
      if (error.code !== 1){
        alert(`Cannot find location: ${error.message}`);
      }
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }


  useEffect(() => {
    getListings()
  }, [])

  useEffect(() => getUserLoc(), []);

  useEffect(() => {
    getListings()
  }, [])

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
      <MapListing userLocation={userLocation} />
      <div className={styles.allListings}>
      {filterListing.map(listing => {
        return <Listing listing={listing}/>
      })}
      </div>
    </>
  )

};

export default ListingPage;