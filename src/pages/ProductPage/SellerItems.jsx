import React, { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';

const SellerItems = (props) => {

  const { item, sellerId, setMainImage, setMainName, setMainDescription, setPageDisplay, setAllItemPictures, setMainCategory } = props;


  function clickSellerItem(e) {
    // setMainImage(e.target.src)
    setMainImage(item.image[0])
    setMainName(item.name);
    setMainDescription(item.description);
    setPageDisplay('product');
    setAllItemPictures(item.image);
    setMainCategory(item.category);
    setPageDisplay('product');
  }


  return (
    <div onClick={clickSellerItem} className={styles.otherItemBox}>
      {/* <div><img className={styles.otherImages} onClick={clickSellerItem} src={Array.isArray(item.image) ? item.image[0] : item.image} alt="description"/></div> */}
      <div><img className={styles.otherImages} onClick={clickSellerItem} src={item.image[0]} alt=""/></div>
      <div>{item.name}</div>
      <div>{item.description}</div>
    </div>
  )
}

export default SellerItems;