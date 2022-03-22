import React, {useState, useEffect} from 'react';

const FilterBar = ({categoryFilterChange, trustFilterChange}) => {

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
      <select name='location'>
        <option value=''>Filter by Location</option>
        <option value='1'>1 mile</option>
        <option value='5'>5 miles</option>
        <option value='10'>10 miles</option>
        <option value='20'>20 miles</option>
        <option value='50'>50 miles</option>
      </select>
      <select name='category' onChange={categoryFilterChange}>
        <option value='default'>Filter by Category</option>
        <option value='electronics'>Electronics</option>
        <option value='automotive'>Automotive</option>
      </select>
    </div>
  )
};

export default FilterBar