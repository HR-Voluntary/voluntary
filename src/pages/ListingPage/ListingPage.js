import React, { useState, useEffect } from 'react';
import MapListing from './Map/Map.js';
import FilterBar from './FilterBar.js';
import axios from 'axios';
import Listing from './Listing.js';
import distance from '@turf/distance';
import rhumbDestination from '@turf/rhumb-destination';
import styles from './listingStyle.module.css';

const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [filterListing, setFilterListing] = useState([]);
  let [userLocation, setUserLocation] = useState([37.791200, -122.396080]);

  // let [mapParams, setMapParams] = useState({
  //   userLoc: null,
  //   mapBounds: [[-122.507740, 37.712124], [-122.393943, 37.816169]]
  // });
  // let [userLocation, setUserLocation] = useState(null);
  // let [mapBounds, setMapBounds] = useState([[-122.507740, 37.712124], [-122.393943, 37.816169]]);

  // const getUserLoc = () => {
  //   const success = (position) => {
  //     const location = [position.coords.longitude, position.coords.latitude];

  // const sw = rhumbDestination(location, 3, -135, { units: 'miles' });
  // const ne = rhumbDestination(location, 3, 45, { units: 'miles' });
  // console.log(location)
  // console.log(sw.geometry.coordinates);
  // console.log(ne.geometry.coordinates);
  // setMapParams({
  //   userLoc: location,
  //   mapBounds: [sw.geometry.coordinates, ne.geometry.coordinates]
  // })

  // setUserLocation([latitude, longitude]);
  // set new mapBounds here  +- 3 miles block around user location OR 4 miles along the diagonal
  //   }
  //   const error = (error) => {
  //     if (error.code !== 1) {
  //       alert(`Cannot find location: ${error.message}`);
  //     }
  //   }
  //   navigator.geolocation.getCurrentPosition(success, error);
  // }

  const getUserLoc = () => {
    const success = (position) => {
      const location = [position.coords.latitude, position.coords.longitude];

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

  useEffect(() =>
    getUserLoc(), []
    );

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
    // if (filterParam === '') {
    //   setInitialViewState(null);
    // }

    // const paramNum = Number(filterParam);
    // // would still be centered around user/default location
    // // set the bounds
    // // if no filter is set, set bounds to null
    // // class = mapboxgl-map
    // let box = document.querySelector('.mapboxgl-map');
    // let width = box.offsetWidth;
    // let height = box.offsetHeight;
    // return [width, height];
  }

  const distanceFilterChange = (e) => {
    // console.log(typeof e.target.value); // string
    // adjustZoom(e.target.value)
<<<<<<< HEAD
    // console.log(adjustZoom());

=======
    console.log(adjustZoom());
>>>>>>> main
  }

  return (
    <>
      <div>Listing Page</div>
      {/* <div>{distance(userLocation, [41.8781, -87.6298], {units: 'miles'})}</div> */}
      <FilterBar
        categoryFilterChange={categoryFilterChange}
        trustFilterChange={trustFilterChange}
        distanceFilterChange={distanceFilterChange} />
      <MapListing
        // userLocation={userLocation}
        mapParams={mapParams}
      />
      <div className={styles.allListings}>
        {filterListing.map(listing => {
          return <Listing listing={listing} />
        })}
      </div>
    </>
  )

};

export default ListingPage;