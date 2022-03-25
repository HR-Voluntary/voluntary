import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import styles from './ProductPage.module.css';
import newStyles from './ProductPageTime.module.css';
import SimilarProducts from './SimilarProducts.jsx';
import SellerItems from './SellerItems.jsx';


const ProductPage = () => {
  //Logged in User Data:
  const userData = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [product, setProduct] = useState('');
  const [mainImage, setMainImage] = useState('');

  const productIdFromRouter = state?.productId;

  function findItem (dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id === productIdFromRouter) {
        setProduct(dataArray[i]);
        return dataArray[i];
      }
    }
  };

  function onItemClickHandler (id) {
    setMainImage('');
    const matchedItem = allItems.filter(item => item.id === id);
    console.log(product)

    setProduct(matchedItem[0]);
    const sameCategoryItems = allItems.filter(item => {
      if (item.id !== productIdFromRouter && item.category === matchedItem[0].category) {
        return item;
      }
    });
    setCategoryItems(sameCategoryItems)
  };

  function onChatClick(product){
    navigate('/ChatPage', { state: { product, productId: product.id } })
  };

  function clickSupportingImage(e) {
    setMainImage(e.target.src);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/user/all')
    .then(response => {
        const userData = response.data;
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
  }, []);


  if (product === '') {
    return null;
  } else {
    return (
      <div className={newStyles.container}>
        <div className={newStyles.focusContainer}>
            <div className={newStyles.mainProductContainer}>
                <div className={newStyles.mainProductContentContainer}>
                  <div className={newStyles.imageBox}>
                    <img src={mainImage || product.image[0]} alt="product"/>
                  </div>
                  <div className={newStyles.supportingImageBox}>
                    {/* {console.log(product, 'THIS IS PRODUCT')} */}
                    {product?.image.map((img, i) =>
                        <div key={i} className={newStyles.supportingImageContainer}>
                          {/* <img src={img} alt="product"/> */}
                          <img onClick={clickSupportingImage} src={img} alt="product"/>
                        </div>
                      )}
                  </div>
                </div>

                <div className={newStyles.mainProductContentContainer}>
                  <div className={newStyles.detailsBox}>
                    <h1>Product: {product.name}</h1>
                    <div>Category: {product.category}</div>
                    <div>Donated by {product.sellerName}</div>
                    <div>Trust Score: {product.trustScore}</div>
                    <h3>{product.description}</h3>
                    <button className={newStyles.chatButton} onClick={() => onChatClick(product)}><span>Chat with Donator</span></button>
                  </div>
                  <div className={newStyles.otherItemsBox}>
                    <h2>All Items from {product.sellerName}</h2>
                    {product.userItems.map(prod => {
                        // console.log(product)
                       return (
                         <div key={prod.id} onClick={() => onItemClickHandler(prod.id)}className={newStyles.otherItemsContainer}>
                          <div className={newStyles.supportingImageContainer}>
                            <img src={prod.image[0]} alt="product"/>
                          </div>
                          <div className={newStyles.otherItemsTextContainer}>
                            <h3>{prod.name}</h3>
                            <div className={styles.supportingDescription}>{prod.description}</div>
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
          <div className={newStyles.innerRelatedContainer}>
            {categoryItems.map(item =>
            <div key={item.id} onClick={() => onItemClickHandler(item.id)} className={newStyles.relatedItem}>
              <div className={newStyles.relatedItemImageBox}>
                <img className={newStyles.relatedItemImage} src={item.image[0]} alt="product"/>
              </div>
              <div className={newStyles.relatedText}>
                <h3>{item.name}</h3>
                <div>Donated by {item.sellerName}</div>
                <div>Trust Score: {item.trustScore}</div>
                <br />
                <div>{item.description}</div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage;
