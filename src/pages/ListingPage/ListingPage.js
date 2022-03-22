import React, { useState, useEffect } from 'react';
import MapListing from './Map/Map.js';
import FilterBar from './FilterBar.js';
import axios from 'axios';
import Listing from './Listing.js';
import distance from '@turf/distance';
import styles from './listingStyle.module.css';


const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [filterListing, setFilterListing] = useState([]);
  let [userLocation, setUserLocation] = useState([37.791200, -122.396080]);
  let [initialViewState, setInitialViewState] = useState(null);

  console.log(filterListing)
  const getUserLoc = () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setUserLocation([latitude, longitude]);
    }
    const error = (error) => {
      if (error.code !== 1) {
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
    axios.get('http://localhost:3001/user/all')
      .then(response => {
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
        // ***** DO NOT DELETE *****
        // ***Will implement sort function once data format from API is correct:
        // itemsForSale.sort((a,b) => {
        //   const distanceA = distance(userLocation, a.location, {units: 'miles'})
        //   const distanceB = distance(userLocation, b.location, {units: 'miles'})
        //   return distanceA - distanceB
        // });
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

  const adjustZoom = (filterParam) => {
    if (filterParam === '') {
      setInitialViewState(null);
    }

    const paramNum = Number(filterParam);
    // would still be centered around user/default location
    // set the bounds
    // if no filter is set, set bounds to null
    // class = mapboxgl-map
    let box = document.querySelector('.mapboxgl-map');
    let width = box.offsetWidth;
    let height = box.offsetHeight;
    return [width, height];
  }

  const distanceFilterChange = (e) => {
    // console.log(typeof e.target.value); // string
    // adjustZoom(e.target.value)
    console.log(adjustZoom());
  }

  return (
    <>
      <div>Listing Page</div>
      {/* <div>{distance(userLocation, [41.8781, -87.6298], {units: 'miles'})}</div> */}
      <FilterBar
        categoryFilterChange={categoryFilterChange}
        trustFilterChange={trustFilterChange}
        distanceFilterChange={distanceFilterChange} />
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