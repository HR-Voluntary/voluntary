import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../firebase';
import styles from './ProductPage.module.css';
import SimilarProducts from './SimilarProducts.jsx'

// get product from Listings page
// if they click get similar products or more from seller
  // it will bring up a list of thos products in the place of the description
// clicking on any image will bring up the prodcut display for that image
// are all images going to be in the form of an array, even if it's just one?
  // I have logic to handle both cases since that is what the data is right now.

const ProductPage = () => {

  const [pageDisplay, setPageDisplay] = useState('product')
  const [product, setProduct] = useState([])
  const [mainImage, setMainImage] = useState('')
  const [newProducts, setNewProducts] = useState([])
  const [mainName, setMainName] = useState('')
  const [mainDescription, setMainDescription] = useState('')
  const [mainSeller, setMainSeller] = useState('')

  const dummyData = '5usff6HI0mIB2TTRy2Ut';


  function clickChat() {
    // update a value in app.js for the sellerId so that chat can access it

  }

  function clickImage(e) {
    // alert('clicked');
    // console.log(e.target.src);
    setMainImage(e.target.src);
    setMainName(e.target.name);
    console.log('name ', mainName);
    setMainDescription(e.target.content);
    console.log('desc ', mainDescription);
    setMainSeller(e.target.seller);
    console.log('seller info ', mainSeller);
    setPageDisplay('product');
  }
  // fix to account for non array images
  function renderImages() {
    return (
      <>
        {product.image.map((img, index) => {
          return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt="different views of item"/>;
          })
        }
      </>
    )
  }

  function renderSimilarImages() {
    return (
      <>
        {newProducts.map((item, index) => {
          // <SimilarProducts
          //   item={item}
          //   setMainImage={setMainImage}
          //   name={item.name}
          //   setMainName={setMainName}
          //   description={item.description}
          //   setMainDescription={setMainDescription}
          //   seller={item.sellerInfo}
          //   setMainSeller={setMainSeller}
          //   setPageDisplay={setPageDisplay}
          // />
          return <img src={Array.isArray(item.image) ? item.image[0] : item.image}
            className={styles.similarImages} key={index} alt="similar things"
            onClick={clickImage}
            name={item.name}
            description={item.description}
            seller={item.sellerInfo}
            />;
          })
        }
      </>
    )
    // return (
    //   <>
    //     {newProducts.map((item, index) => {
    //       return <img src={Array.isArray(item.image) ? item.image[0] : item.image}
    //         className={styles.similarImages} key={index} alt="similar things"
    //         onClick={clickImage}
    //         name={item.name}
    //         content={item.description}
    //         seller={item.sellerInfo}
    //         />;
    //       })
    //     }
    //   </>
    // )
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
            <h2>{mainName || product.name}</h2>
            <div className={styles.description}>{mainDescription || product.description}</div>
            <button onClick={clickChat}><a href="http://localhost:3001/ChatPage">Chat with Seller</a></button>
          </div>
        </>
      )
    } else if (pageDisplay === 'similar') {
      return (
        <>
          <div className="main-product-pic-box">
            <img className= "product-img" src={mainImage || product.image} alt="item"/>
            <div>{product.image ? renderImages() : ''}</div>
          </div>
          <div className="other-info-box">
            <h2>Similar Products</h2>
            <div>{newProducts.length ? renderSimilarImages() : ''}</div>
          </div>
        </>
      )
    } else if (pageDisplay === 'sellerItems') {
      return (
        <>
          <div className="main-product-pic-box">
            <img className= "product-img" src={mainImage || product.image} alt="item"/>
            <div>{product.image ? renderImages() : ''}</div>
          </div>
        </>
      )
    } else {
      return <div>Something went wrong</div>
    }
  }

  function clickSimilar() {
    const category = product.category;
    setPageDisplay('similar');
    axios.get(`http://localhost:3000/item/category/${category}`)
      .then(response => {
        console.log('category response ', response)
        setNewProducts(response.data)
      })
      .catch(err => console.log(err))
  }

  function clickSellerItems() {
    const sellerId = product.sellerInfo;
    setPageDisplay('sellerItems');
    axios.get(`http://localhost:3000/user/${sellerId}`)
      .then(response => {
        console.log('seller items response ', response)
        setNewProducts(response.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/item/${dummyData}`) // limit the get of images to fit the screen
      .then(response => {
        console.log(response)
        setProduct(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    console.log('new item clicked')
  }, [mainName])

  return (
    <>
      {/* link back to listing page */}
      {/* <button onClick={() => setPageDisplay('listings')}>Back to Listings</button> */}
      <button><a href="http://localhost:3001/ListingPage">Back to Listings</a></button>
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