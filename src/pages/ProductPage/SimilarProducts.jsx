import React, { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';

const SimilarProducts = (props) => {


const { item, setMainImage, setMainName, setMainDescription, setMainSeller, setPageDisplay } = props;


function clickImage() {

}

  return (
    <>
      <img src={Array.isArray(item.image) ? item.image[0] : item.image}
            className={styles.similarImages} alt="similar things"
            onClick={clickImage}
            name={item.name}
            description={item.description}
            seller={item.sellerInfo}
            />
    </>
  )
}



export default SimilarProducts;