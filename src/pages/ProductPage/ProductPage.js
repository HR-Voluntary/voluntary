import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../firebase';
import styles from './ProductPage.module.css';
import ProductPicView from './ProductPicView.jsx'

// get product from Listings page
// if they click get similar products or more from seller
  // it will bring up a list of thos products in the place of the description
// clicking on any image will bring up the prodcut display for that image

const ProductPage = () => {

  const [pageDisplay, setPageDisplay] = useState('product')
  const [product, setProduct] = useState([])
  const [mainImage, setMainImage] = useState('')
  const [newProducts, setNewProdcuts] = useState({})

  const dummyData = '5usff6HI0mIB2TTRy2Ut';


  function clickChat() {

  }

  function clickImage(e) {
    // alert('clicked');
    console.log(e.target.src);
    setMainImage(e.target.src);
  }

  function renderImages() {
    return (
      <>
        {product.image.map(img => {
          return <img src={img} className={styles.allProductImages} onClick={clickImage} alt="different views of item"/>;
          })
        }
      </>
    )
  }

  function renderPage() {
    if (pageDisplay === 'product') {
      return (
        <>
          <div className="main-product-pic-box">
            <img className= "product-img" src={mainImage || product.image} alt="item"/>
            <div>{product.image ? renderImages() : ''}</div>
          </div>
          <div className="other-info-box">
            <h2>{product.name}</h2>
            <div className={styles.description}>{product.description}</div>
            <button onClick={clickChat}>Chat with Seller</button>
          </div>
        </>
      )
    } else if (pageDisplay === 'similar') {
      return (
        <>
        </>
      )
    } else if (pageDisplay === 'sellerItems') {
      return (
        <>

        </>
      )
    } else {
      return <div>Something went wrong</div>
    }
  }

  function clickSimilar() {
    const category = product.category;
    setPageDisplay('similar');
    axios.get(`http://localhost:3000/category/${category}`)
      .then(response => {
        console.log('category response ', response)
        // setNewProducts(response.data))
      })
      // .catch(err => console.log(err))
  }

  function clickSellerItems() {
    const sellerId = product.sellerInfo;
    setPageDisplay('sellerItems');
    axios.get(`http://localhost:3000/${sellerId}`)
      .then(response => {
        console.log('category response ', response)
        // setNewProducts(response.data))
      })
      // .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/item/${dummyData}`) // limit the get of images to fit the screen
      .then(response => {
        console.log(response)
        setProduct(response.data)
      })
  }, [])


  return (
    <>
      {/* link back to listing page */}
      <button onClick={() => setPageDisplay('listings')}>Back to Listings</button>
      {/* <button onClick={() => setPageDisplay('similar')}>Similar Products</button> */}
      <button onClick={clickSimilar}>Similar Products</button>
      {/* <button onClick={() => setPageDisplay('sellerItems')}>Other Items from the Seller</button> */}
      <button onClick={clickSellerItems}>Other Items from the Seller</button>
      <div>
        {renderPage()}
      </div>

    </>
  )
}

export default ProductPage;


// {product.image.map((img, index) =>
//   <ProductPicView prodImages={product.image} key={index}/>
// )}