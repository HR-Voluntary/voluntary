import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../firebase';
import styles from './ProductPage.module.css';
import SimilarProducts from './SimilarProducts.jsx';
import SellerItems from './SellerItems.jsx'


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
  const [allItemPictures, setAllItemPictures] = useState([])

  const dummyData = '5usff6HI0mIB2TTRy2Ut';


  function clickChat() {
    // update a value in app.js for the sellerId so that chat can access it

  }

  function clickImage(e) {
    // setProduct(newProductID)
    setMainImage(e.target.src);
    setPageDisplay('product');
  }


  function renderImages() {
    if (allItemPictures.length > 0) {
      if (Array.isArray(allItemPictures)) {
        return (
          <>
            {allItemPictures.map((img, index) => {
              return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt="different views of item"/>;
            })
            }
          </>
          )
          }
          // else {
          //   return <img src={allItemPictures} className={styles.allProductImages} alt="same main pic" />
          // }
    } else {
      return (
        <>
          {product.image.map((img, index) => {
            return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt="different views of item"/>;
          })
          }
        </>
      )
    }
    // return (
    //   <>
    //     {allItemPictures.length > 0 ?
    //       // (Array.isArray(allItemPictures) ?
    //       allItemPictures.map((img, index) => {
    //         return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt="different views of item"/>;
    //       })
    //         // :
    //         //   return <div></div>;
    //       // )
    //       :
    //       product.image.map((img, index) => {
    //         return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt="different views of item"/>;
    //       })
    //     }
    //   </>
    // )
  }

  function renderSimilarProducts() {
    return (
      <div>
        {newProducts.map((item, index) => {
          return <SimilarProducts item={item}
            setMainImage={setMainImage}
            setMainName={setMainName}
            setPageDisplay={setPageDisplay}
            setMainDescription={setMainDescription}
            setAllItemPictures={setAllItemPictures}
            sellerId={newProducts.sellerInfo}
            key={index}/>
          })
        }
      </div>
    )
  }

  function renderSellerProducts() {
    return (
      <div>
        {newProducts.map((item, index) => {
          return <SellerItems item={item}
          setMainImage={setMainImage}
          setMainName={setMainName}
          setPageDisplay={setPageDisplay}
          setMainDescription={setMainDescription}
          setAllItemPictures={setAllItemPictures}
          sellerId={product.sellerInfo}
          key={index}/>
          })
        }
      </div>
    )
  }

  function renderPage() {
    if (pageDisplay === 'product') {
      return (
        <div className={styles.fullPage}>
          <div className={styles.mainProductPicBox}>
            <img className={styles.productImg} src={mainImage || product.image} alt="item"/>
            {/* {allItemPictures.length > 0 ?
              <div>{Array.isArray(allItemPictures) ? allItemPictures.map(pic => pic) : allItemPictures}</div>
              : */}
              {/* <div>{Array.isArray(allItemPictures) ? renderImages() : allItemPictures}</div> */}
              <div>{Array.isArray(product.image) ? renderImages() : <img src={product.image} alt=""/>}</div>
            {/* } */}
          </div>
          <div className={styles.otherInfoBox}>
            <h2>{mainName || product.name}</h2>
            <div className={styles.description}>{mainDescription || product.description}</div>
            <button onClick={clickChat}><a className={styles.link} href="http://localhost:3001/ChatPage">Chat with Seller</a></button>
          </div>
        </div>
      )
    } else if (pageDisplay === 'similar') {
      return (
        <div className={styles.fullPage}>
          <div className={styles.mainProductPicBox}>
            <img className={styles.productImg} src={mainImage || product.image} onClick={clickImage} alt="item"/>
            <div>{Array.isArray(product.image) ? renderImages() : product.image}</div>
          </div>
          <div className={styles.otherInfoBox}>
            <h2>Similar Products</h2>
            <div>{newProducts.length ? renderSimilarProducts() : ''}</div>
          </div>
        </div>
      )
    } else if (pageDisplay === 'sellerItems') {
      return (
        <div className={styles.fullPage}>
          <div className={styles.mainProductPicBox}>
            <img className={styles.productImg} src={mainImage || product.image} onClick={clickImage} alt="item"/>
            <div>{Array.isArray(product.image) ? renderImages() : product.image}</div>
          </div>
          <div className={styles.otherInfoBox}>
            <h2>All Items from this Seller</h2>
            <div>{newProducts.length ? renderSellerProducts() : ''}</div>
          </div>
        </div>
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
    axios.get(`http://localhost:3000/user/profile/${sellerId}`)
      .then(response => {
        console.log('seller items response ', response)
        setNewProducts(response.data[0].userItems)
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
      <button><a className={styles.link} href="http://localhost:3001/ListingPage">Back to Listings</a></button>
      <button onClick={clickSimilar}>Similar Products</button>
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