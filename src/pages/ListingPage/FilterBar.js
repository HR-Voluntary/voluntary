import React from 'react';
import styles from './listingStyle.module.css';

const FilterBar = ({categoryFilterChange, trustFilterChange, distanceFilterChange}) => {

  return (
    <div className={styles.filterBarAllButtons}>
      <select name='trust'onChange={trustFilterChange} className={styles.filterBarButton}>
        <option value='defaultTrust'>Filter by Trust</option>
        <option value='4'>4+</option>
        <option value='3'>3+</option>
        <option value='2'>2+</option>
        <option value='1'>1+</option>
      </select>
      <select name='location' onChange={distanceFilterChange} className={styles.filterBarButton}>
        <option value='default'>Filter by Location</option>
        <option value='1'>1 km</option>
        <option value='2'>2 km</option>
        <option value='10'>10 km</option>
        <option value='20'>20 km</option>
        <option value='50'>50 km</option>
        <option value='100'>100 km</option>
      </select>
      <select name='category' onChange={categoryFilterChange} className={styles.filterBarButton}>
        <option value='default'>Filter by Category</option>
        <option value='automotive'>Automotive</option>
        <option value='clothing'>Clothing</option>
        <option value='collectibles'>Collectibles</option>
        <option value='electronics'>Electronics</option>
        <option value='food'>Food</option>
        <option value='furniture'>Furniture</option>
        <option value='kitchen'>Kitchen</option>
        <option value='toys'>Toys</option>
      </select>
    </div>
  )
};

export default FilterBar