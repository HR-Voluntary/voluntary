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
    <div onClick={clickSellerItem} className={styles.otherItemBox}>
      <div><img className={styles.otherImages} onClick={clickSellerItem} src={Array.isArray(item.image) ? item.image[0] : item.image} alt="description"/></div>
      <div>{item.name}</div>
      <div>{item.description}</div>
    </div>
  )
}

export default SellerItems;