import React, { useState, useEffect } from 'react';
const axios = require('axios');
import { logout } from '../../firebase';

// get product from Listings page


const ProductPage = () => {

  const [pageDisplay, setPageDisplay] = useState('product')
  const [products, setProducts] = useState([])

  function clickChat() {

  }

  function renderImages() {

  }

  function renderPage() {
    if (pageDisplay === 'product') {
      return (
        <>
          <img className= "product-img" src=""/>
          {renderImages}
          <h2>Product Name</h2>
          <div>Description</div>
          <button onClick={clickChat}>Chat with Seller</button>
        </>
      )
    } else if (pageDisplay === 'similar') {
      return (
        <>
          {products.map(product => {
            return <div>image</div>}
          )}
        </>
      )
    } else if (pageDisplay === 'otherSellerItems') {
      return (
        <>
          {products.map(product => {
            return <div>image</div>}
          )}
        </>
      )
    } else {
      return <div>Something went wrong</div>
    }
  }

  useEffect(() => {
    axios.get(``) // limit the get of images to fit the screen
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [pageDisplay])

  return (
    <>
      {/* link back to listing page */}
      <button onClick={() => setPageDisplay('listings')}>Back to Listings</button>
      <button onClick={() => setPageDisplay('similar')}>Similar Products</button>
      <button onClick={() => setPageDisplay('otherSellerItems')}>Other Items from the Seller</button>
      <div>
        {renderPage()}
      </div>

    </>
  )
}

export default ProductPage;