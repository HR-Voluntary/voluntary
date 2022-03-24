import React from 'react';
import styles from './ProfilePage.module.css';

const ProfileProductCard = ({
  card,
  index,
  navigate,
  editModalWindow,
  setEditModalWindow,
  setProductTitle,
  setProductDescription,
  setProductCategory,
  setEditProductId,
  onDeleteClickHandler,
  onActiveClickHandler
  }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.dotStatusContainer}>
        <div
          className={(card.isActive) ? styles.active : styles.notActive} /> {card.isActive ? 'Item is active' : 'Item is not active'}
      </div>
      <div key={`product-${index}`} className={styles.card}>
        <div className={styles.imgTxtContainer}>
          <div className={styles.cardImgContainer}>
            {card.image[0] && <img src={card.image[0]} alt="Product for sale"/> }
          </div>
          <div className={styles.cardTxtContainer}>
            <div className={styles.cardTitle}>{card.name}</div>
            <div className={styles.cardCategory}>{card.category}</div>
            <div className={styles.cardDescription}>{card.description}</div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => {
            navigate("/ProductPage", {state: { productId: card.id }})
          }}>See Listing</button>
          <button onClick={() => {
            setEditModalWindow(!editModalWindow)
            setProductTitle(card.name);
            setProductDescription(card.description);
            setProductCategory(card.category);
            setEditProductId(card.id);
          }}
          >Edit</button>
          <button onClick={() => onDeleteClickHandler(card.id)}>Delete</button>
          <button onClick={() => onActiveClickHandler(card.id, card.isActive)}>{card.isActive ? ('Mark as Taken') : ('Mark as Active')}</button>
        </div>
      </div>
    </div>
  );
}



export default ProfileProductCard;