import React, { useState, useEffect } from 'react';
import MapListing from './Map/MapListing.js';
import FilterBar from './FilterBar.js';
import axios from 'axios';
import Listing from './Listing.js';
import distance from '@turf/distance';
import styles from './listingStyle.module.css';

const ListingPage = () => {
  let [allListings, setAllListings] = useState([]);
  let [filterListing, setFilterListing] = useState([]);
  let [userLocation, setUserLocation] = useState([37.791200, -122.396080]);
  let [highlightedListing, setHighlightedListing] = useState(null);

  const getUserLoc = () => {
    const success = (position) => {
      const location = [position.coords.latitude, position.coords.longitude];
      axios({
        method: 'put',
        url: 'http://localhost:3001/user/editUsr/7VOVbYFQl9gl716RJKYcU2KO8pI3',
        data: { location: location }
      })
        .then(() => setUserLocation(location))
        .catch((err) => alert(`Error updating user location: ${err.message}`));
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
    console.log(listings)
    let filtered = listings.filter(listing => {
      if (listing.category === filterParam) {
        return listing;
      }
    })
    setFilterListing(filtered);
    if (filterParam === 'default') {
      setFilterListing(allListings)
    }
  }

  const categoryFilterChange = (e) => {
    filterListingsByCategory(allListings, e.target.value)
  }

  const filterListingsByTrust = (listings, filterParam) => {
    let filter = listings.filter((listing) => {
      if (listing.trustScore >= parseInt(filterParam)) {
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

  const filterListingsByDistance = (listings, filterParam) => {
    if (filterParam === 'default') {
      setFilterListing(allListings);
    } else {
      const filterParamNum = Number(filterParam);
      let filter = listings.filter((listing) => {
        if (Array.isArray(listing.location)) {
          const dist = distance(userLocation, listing.location, { units: 'kilometers' })
          // console.log(dist);
          if (dist < filterParamNum) {
            return listing;
          }
        }
      });

      setFilterListing(filter);

    }
  }

  const distanceFilterChange = (e) => {
    filterListingsByDistance(allListings, e.target.value)
  }

  const changeHighlightedListing = (listing) => {
    // console.log(listing);
    setHighlightedListing(listing);
  }

  return (
    <div className={styles.parent}>
      <div className={styles.filterBarParent}>
        <FilterBar
          categoryFilterChange={categoryFilterChange}
          trustFilterChange={trustFilterChange}
          distanceFilterChange={distanceFilterChange}
        />
      </div>
      <div className={styles.parentMapListings}>
        <div className={styles.allListings}>
          {filterListing.map(listing => {
            return <Listing listing={listing} highlightedListing={highlightedListing}/>
          })}
        </div>
        <div className={styles.map}>
          <MapListing
            userLocation={userLocation}
            filterListing={filterListing}
            changeHighlightedListing={changeHighlightedListing}
          />
        </div>
      </div>
    </div>
  )

};

export default ListingPage;