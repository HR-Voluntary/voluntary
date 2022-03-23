import React, {useState, useEffect} from 'react';

const FilterBar = ({categoryFilterChange, trustFilterChange, distanceFilterChange}) => {

  return (
    <div>
      <select name='trust'onChange={trustFilterChange} >
        <option value='defaultTrust'>Filter by Trust</option>
        <option value='9'>9+</option>
        <option value='8'>8+</option>
        <option value='7'>7+</option>
        <option value='6'>6+</option>
        <option value='5'>5+</option>
        <option value='4'>4+</option>
        <option value='3'>3+</option>
        <option value='2'>2+</option>
        <option value='1'>1+</option>
      </select>
      <select name='location' onChange={distanceFilterChange}>
        <option value='default'>Filter by Location</option>
        <option value='1'>1 km</option>
        <option value='2'>2 km</option>
        <option value='10'>10 km</option>
        <option value='20'>20 km</option>
        <option value='50'>50 km</option>
        <option value='100'>100 km</option>
      </select>
      <select name='category' onChange={categoryFilterChange}>
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