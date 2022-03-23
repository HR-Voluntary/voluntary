import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import styles from './ProductPage.module.css';
import newStyles from './ProductPageTime.module.css';
import SimilarProducts from './SimilarProducts.jsx';
import SellerItems from './SellerItems.jsx'

const ProductPage = () => {
  //Logged in User Data:
  const userData = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [product, setProduct] = useState('');

  // const dummyArray = [1,2,3,4];
  // const rockwell = [1, 1, 1, 1, 1, 1, 1];
  // const productIdFromRouter = state?.productId;
  const productIdFromRouter = "Ujl14tOWenPtkTyJvRE9";

  function findItem (dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id === productIdFromRouter) {
        setProduct(dataArray[i]);
        return dataArray[i];
      }
    }
  };

  function onItemClickHandler (id) {
    const matchedItem = allItems.filter(item => item.id === id);

    setProduct(matchedItem[0]);
    const sameCategoryItems = allItems.filter(item => {
      if (item.id !== productIdFromRouter && item.category === matchedItem[0].category) {
        return item;
      }
    });
    setCategoryItems(sameCategoryItems)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/user/all')
    .then(response => {
      // console.log(response)
        const userData = response.data;
        // console.log('main data ', userData);
        let itemsForSale = [];
        userData.forEach(user => {
          user.userItems.forEach(item => {
            item.trustScore = user.trustScore;
            item.sellerName = user.name;
            item.userItems = user.userItems;
            itemsForSale.push(item);
          })
        });

      setAllItems(itemsForSale)
      const focusItem = findItem(itemsForSale);
      const sameCategoryItems = itemsForSale.filter(item => {
        if (item.id !== productIdFromRouter && item.category === focusItem.category) {
          return item;
        }
      });
      setCategoryItems(sameCategoryItems)
    });
  }, [])


  if (product === '') {
    return null;
  } else {
    return (
      <div className={newStyles.container}>
        <div className={newStyles.focusContainer}>
            <div className={newStyles.mainProductContainer}>
                <div className={newStyles.mainProductContentContainer}>
                  <div className={newStyles.imageBox}>
                    <img src={product.image[0]} alt="product"/>
                  </div>
                  <div className={newStyles.supportingImageBox}>
                    {product.image.map((img, i) =>
                        <div key={i} className={newStyles.supportingImageContainer}>
                          <img src={img} alt="product"/>
                        </div>
                      )}
                  </div>
                </div>

                <div className={newStyles.mainProductContentContainer}>
                  <div className={newStyles.detailsBox}>
                    <h1>Product: {product.name}</h1>
                    <div>Category: {product.category}</div>
                    <div>Sold by {product.sellerName}</div>
                    <div>Trust Score: {product.trustScore}</div>
                    <h3>{product.description}</h3>
                    <button>Chat</button>
                  </div>
                  <div className={newStyles.otherItemsBox}>
                    <h2>Other Items from the Seller</h2>
                    {product.userItems.map(prod => {
                        // console.log(product)
                       return (
                         <div key={prod.id} onClick={() => onItemClickHandler(prod.id)}className={newStyles.otherItemsContainer}>
                          <div className={newStyles.supportingImageContainer}>
                            <img src={prod.image[0]} alt="product"/>
                          </div>
                          <div className={newStyles.textContainer}>
                            <h3>{prod.name}</h3>
                            <div>{prod.description}</div>
                          </div>
                        </div>
                          )
                        }
                      )}
                  </div>
                </div>
            </div>
        </div>
        <div className={newStyles.relatedContainer}>
          <h2>Related Items</h2>
          {categoryItems.map(item =>
          <div key={item.id} onClick={() => onItemClickHandler(item.id)} className={newStyles.relatedItem}>
            <div className={newStyles.relatedItemImageBox}>
              <img className={newStyles.relatedItemImage} src={item.image[0]} alt="product"/>
            </div>
            <div className={newStyles.relatedText}>
              <h3>{item.name}</h3>
              <div>Sold by {item.sellerName}</div>
              <div>{item.description}</div>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

export default ProductPage;


// const ProductPage = () => {
//   const [pageDisplay, setPageDisplay] = useState('product')
//   const [product, setProduct] = useState([])
//   const [mainImage, setMainImage] = useState('')
//   const [newProducts, setNewProducts] = useState([])
//   const [mainName, setMainName] = useState('')
//   const [mainDescription, setMainDescription] = useState('')
//   const [mainSeller, setMainSeller] = useState('')
//   const [allItemPictures, setAllItemPictures] = useState([])
//   const [mainCategory, setMainCategory] = useState('')
//   const { state } = useLocation();
//   // console.log(state)
//   // const dummyData = '5usff6HI0mIB2TTRy2Ut';
//   const dummyData = 'OUjA98VUU1VpdOGgCEcm';
//   // const dummyData = state?.productId;
//   const navigate = useNavigate();


//   function clickChat() {
//     // update a value in app.js for the sellerId so that chat can access it
//     // mainSeller || product.sellerInfo
//     navigate('/ChatPage', {
//       state: { product }
//     });
//   }

//   function clickImage(e) {
//     // setProduct(newProductID)
//     setMainImage(e.target.src);
//     setPageDisplay('product');
//   }


//   function renderImages() {
//     if (allItemPictures.length > 0) {
//       if (Array.isArray(allItemPictures)) {
//         return (
//           <>
//             {allItemPictures.map((img, index) => {
//               return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt=""/>;
//             })
//             }
//           </>
//           )
//       } else {
//         return <img src={allItemPictures} className={styles.allProductImages} alt=""/>
//       }

//     } else {
//       if (Array.isArray(product.image)) {
//         return (
//           <>
//             {product.image.map((img, index) => {
//               return <img src={img} className={styles.allProductImages} onClick={clickImage} key={index} alt=""/>;
//             })
//             }
//           </>
//         )
//       } else {
//         return <img src={product.image} className={styles.allProductImages} alt=""/>
//       }
//     }
//   }

//   function renderSimilarProducts() {
//     return (
//       <div>
//         {newProducts.map((item, index) => {
//           return <SimilarProducts item={item}
//             setMainImage={setMainImage}
//             setMainName={setMainName}
//             setPageDisplay={setPageDisplay}
//             setMainDescription={setMainDescription}
//             setAllItemPictures={setAllItemPictures}
//             sellerId={newProducts.sellerInfo}
//             // setMainSeller={setMainSeller}
//             key={index}/>
//           })
//         }
//       </div>
//     )
//   }

//   function renderSellerProducts() {
//     return (
//       <div>
//         {newProducts.map((item, index) => {
//           return <SellerItems item={item}
//           setMainImage={setMainImage}
//           setMainName={setMainName}
//           setPageDisplay={setPageDisplay}
//           setMainDescription={setMainDescription}
//           setAllItemPictures={setAllItemPictures}
//           setMainCategory={setMainCategory}
//           sellerId={product.sellerInfo}
//           key={index}/>
//           })
//         }
//       </div>
//     )
//   }

//   function renderPage() {
//     if (pageDisplay === 'product') {
//       return (
//         <div className={styles.fullPage}>
//           <div className={styles.mainProductPicBox}>
//             <img className={styles.productImg} src={mainImage} alt=""/>
//               <div>{renderImages()}</div>
//               {/* <div>{Array.isArray(product.image) ? renderImages() : <img src={product.image} alt=""/>}</div> */}
//           </div>
//           <div className={styles.otherInfoMainBox}>
//             <h2>{mainName || product.name}</h2>
//             <div className={styles.description}>{mainDescription || product.description}</div>
//             <button onClick={clickChat}>Chat with Seller</button>
//           </div>
//         </div>
//       )
//     } else if (pageDisplay === 'similar') {
//       return (
//         <div className={styles.fullPage}>
//           <div className={styles.mainProductPicBox}>
//             <img className={styles.productImg} src={mainImage || product.image} onClick={clickImage} alt=""/>
//             <div>{Array.isArray(product.image) ? renderImages() : product.image[0]}</div>
//           </div>
//           <div className={styles.otherInfoMainBox}>
//             <h2>Similar Products</h2>
//             <div className={styles.otherItemList}>{newProducts.length ? renderSimilarProducts() : ''}</div>
//           </div>
//         </div>
//       )
//     } else if (pageDisplay === 'sellerItems') {
//       return (
//         <div className={styles.fullPage}>
//           <div className={styles.mainProductPicBox}>
//             <img className={styles.productImg} src={mainImage || product.image} onClick={clickImage} alt=""/>
//             <div>{Array.isArray(product.image) ? renderImages() : product.image[0]}</div>
//           </div>
//           <div className={styles.otherInfoMainBox}>
//             <h2>All Items from this Seller</h2>
//             <div>{newProducts.length ? renderSellerProducts() : ''}</div>
//           </div>
//         </div>
//       )
//     } else {
//       return <div>Something went wrong</div>
//     }
//   }

//   function clickSimilar() {
//     const category = mainCategory || product.category;
//     setPageDisplay('similar');
//     axios.get(`http://localhost:3001/item/category/${category}`)
//       .then(response => {
//         console.log('category response ', response)
//         setNewProducts(response.data)
//       })
//       .catch(err => console.log(err))
//   }

//   function clickSellerItems() {
//     const sellerId = product.sellerInfo;
//     setPageDisplay('sellerItems');
//     axios.get(`http://localhost:3001/user/profile/${sellerId}`)
//       .then(response => {
//         console.log('seller items response ', response)
//         setNewProducts(response.data[0].userItems)
//       })
//       .catch(err => console.log(err))
//   }

//   useEffect(() => {
//     axios.get(`http://localhost:3001/item/${dummyData}`) // limit the get of images to fit the screen
//       .then(response => {
//         console.log(response)
//         setProduct(response.data)
//         setMainImage(response.data.image[0])
//       })
//       .catch(err => console.log(err))
//   }, [])

//   useEffect(() => {
//     console.log('new item clicked')
//   }, [mainName])

//   return (
//     <>
//       <button onClick={() => navigate('/ListPage')}>Back to Listings</button>

//       <button onClick={clickSimilar}>Similar Products</button>
//       <button onClick={clickSellerItems}>Other Items from the Seller</button>
//       <div>
//         {renderPage()}
//       </div>
//     </>
//   )
// }

// export default ProductPage;
