import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import styles from './ProfilePage.module.css';
import khristian from './images/khristian.jpeg';
import Modal from './Modal/Modal.js';
import './ProfilePageCarousel.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import useUploadImage from '../../components/hooks/useUploadImage'

const ProfilePage = () => {
  const [user, setUser] = useState({ name: 'Rob Cherry T.', type: 'Individual', location: 'Los Angeles', votes: 6, trustLevel: 5, listings: [1, 2, 3, 4, 5, 6], claimed: [1, 2, 3, 4] });
  const [show, setShow] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');

  // Photo Upload Custom Hook:
  const { onFileChange, onFormSubmit, completedImgArray } = useUploadImage();

  console.log(completedImgArray)

  useEffect(() => {

  })

  function showModal() {
    setShow(!show);
  };

  function handleProductTitleChange(e) {
    setProductTitle(e.target.value)
  }

  function handleProductDescriptionChange(e) {
    setProductDescription(e.target.value)
  }

  return (
    <section>
      <div className={styles.navbar}>
        <button className={styles['list-item-btn']}>List Item</button>
      </div>
      <div className={styles.heading}>
        <img className={styles.pic} src={khristian} alt="profile-pic" />
        <div className={styles['profile-name']}>
          <h2>{user.name}</h2>
          <h4>{user.type}</h4>
          <h4>{user.location}</h4>
        </div>
        <div className={styles.votes}>
          <div>
            <h2>Trust Votes</h2>
            <h4>{user.votes} votes</h4>
          </div>
          <div>
            <h2>Trust Level</h2>
            <h4>lv. {user.trustLevel}</h4>
          </div>
        </div>
        {/* MAY POTENTIALLY BREAK CSS MODULE FOLDER GIVEN NAME CONVENTION */}
        <button className={styles['msg-btn']}>Message</button>
      </div>
      <div className={styles.body}>
        {/* MAY POTENTIALLY BREAK CSS MODULE FOLDER GIVEN NAME CONVENTION */}
        <div className={styles['cards-container']}>
          <h2>Listings</h2>
          <div className={styles['cards-container-two']}>
            <Carousel verticalMode itemsToShow={4}>
              {user.listings.map((card, i) =>
                <div className={styles.card}></div>
              )}
            </Carousel>
          </div>
        </div>
        <div className={styles['cards-container']}>
          <h2>Claimed</h2>
          <div className={styles['cards-container-two']}>
            <Carousel verticalMode itemsToShow={4}>
              {user.claimed.map((card, i) =>
                <div className={styles.card}></div>
              )}
            </Carousel>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <button onClick={() => setShow(!show)}>OPEN MODAL TEST BUTTON</button>
      <Modal onClose={showModal} show={show}>
        <form className={styles.formContainer} onSubmit={onFormSubmit}>
          <label>
            <h2>Product Title:</h2>
            <input className={styles['form-product-title']} type="text" value={productTitle} onChange={handleProductTitleChange} />
          </label>
          <label>
            <h2>Product Description:</h2>
            <textarea className={styles['form-product-description']} type="text" value={productDescription} onChange={handleProductDescriptionChange} />
          </label>
          <h2>Upload Picture:</h2>
          <input type="file" onChange={onFileChange}/>
          <input className={styles['form-submit']} type="submit" value="POST PRODUCT" />
        </form>

      </Modal>
    </section>
  )
};

export default ProfilePage;