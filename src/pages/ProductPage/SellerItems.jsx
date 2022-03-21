import React, { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';

const SellerItems = (props) => {

  const { item, sellerId, setMainImage, setMainName, setMainDescription, setPageDisplay, setAllItemPictures } = props;


  function clickSellerItem(e) {
    setMainImage(e.target.src)
    setMainName(item.name);
    setMainDescription(item.description);
    setPageDisplay('product');
    setAllItemPictures(item.image);
    setPageDisplay('product');
  }


  return (
    <div onClick={clickSellerItem}>
      <div>{item.name}</div>
      <img className={styles.sellerItemImages} onClick={clickSellerItem} src={Array.isArray(item.image) ? item.image[0] : item.image} alt="description"/>
      <div>{item.description}</div>
    </div>
  )
}

export default SellerItems;