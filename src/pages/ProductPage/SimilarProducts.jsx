import React, { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';

const SimilarProducts = (props) => {


const { item, setMainImage, setMainName, setMainDescription, setMainSeller, setPageDisplay } = props;


function clickSimilarItem(e) {
  setMainImage(e.target.src);
  setMainName(item.name);
  setMainDescription(item.description);
  setPageDisplay('product');
}

  // limit the description text to one line, or whatever looks goos with the
  // picture on the mini list display
  return (
    <div onClick={clickSimilarItem}>
      <div>{item.name}</div>
      <img className={styles.similarImages} onClick={clickSimilarItem} src={Array.isArray(item.image) ? item.image[0] : item.image} alt="description"/>
      <div>{item.description}</div>
    </div>
  )
}



export default SimilarProducts;

/*
<img src={Array.isArray(item.image) ? item.image[0] : item.image}
className={styles.similarImages} alt="similar things"
onClick={clickImage}
name={item.name}
description={item.description}
seller={item.sellerInfo}
/>
*/