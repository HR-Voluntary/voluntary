import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import styles from './ProfilePage.module.css';
import Modal from './Modal/Modal.js';
import './ProfilePageCarousel.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import useUploadImage from '../../components/hooks/useUploadImage'

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');

  // Photo Upload Custom Hook:
  const { onFileChange, onFormSubmitGeneratePhotoUrl, completedImgArray } = useUploadImage();

  // console.log(completedImgArray)

  useEffect(() => {
    axios.get(`http://localhost:3001/user/profile/1AOjnwnoc5bxD1u3VBiaNzKYL2k1`)
    .then(res => {
      console.log(res.data)
      setUser(res.data[0]);
    })
    .then((res) => {
      console.log(res);
    })
    .catch(e => console.log(e, 'im not working'))
  }, [])


  function showModal() {
    setShow(!show);
  };

  function handleProductTitleChange(e) {
    setProductTitle(e.target.value)
  }

  function handleProductDescriptionChange(e) {
    setProductDescription(e.target.value)
  }
function handleProductCategoryChange(e) {
  setProductCategory(e.target.value)
}

async function onFormSubmit(e) {
  e.preventDefault();
  const arrOfS3SuccessPuts = await onFormSubmitGeneratePhotoUrl();
  let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
    // This map returns the exact URL we can use as an img tag's source:
    return s3url.config.url.split('?')[0];
  });
  console.log(s3photoUrlsArray);
  let itemToPost = {
    category: productCategory,
    sellerInfo: user.id,
    image:s3photoUrlsArray,
    description: productDescription,
    name: productTitle
  };
  console.log(itemToPost);
  setProductTitle('');
  setProductDescription('');
  setProductCategory('');
}

  if (user === null) {
    return null;
  } else {
    return (
      <section>
        <div className={styles.navbar}>
          <button className={styles['list-item-btn']}>List Item</button>
        </div>
        <div className={styles.heading}>
          <img className={styles.pic} src={user.photo} alt="profile-pic" />
          <div className={styles['profile-name']}>
            <h2>{user.name}</h2>
            <h4>{user.type}</h4>
            <h4>{user.location}</h4>
          </div>
          <div className={styles.votes}>
            <div>
              <h2>Trust Votes</h2>
              <h4>{user.ratingsScore} votes</h4>
            </div>
            <div>
              <h2>Trust Level</h2>
              <h4>lv. {user.trustScore}</h4>
            </div>
          </div>
          <button className={styles['msg-btn']}>Message</button>
        </div>
        <div className={styles.body}>
          <div className={styles['cards-container']}>
            <h2>Listings</h2>
            <div className={styles['cards-container-two']}>
              <Carousel verticalMode itemsToShow={4}>
                {user.userItems.map((card, i) =>
                  <div key={`product-${i}`} className={styles.card}></div>
                )}
              </Carousel>
            </div>
          </div>
          <div className={styles['cards-container']}>
            <h2>Claimed</h2>
            {/* <div className={styles['cards-container-two']}>
              <Carousel verticalMode itemsToShow={4}>
                {user.claimed.map((card, i) =>
                  <div key={`claimed-${i}`} className={styles.card}></div>
                )}
              </Carousel>
            </div> */}
          </div>
        </div>

        {/* Modal Form */}
        <button onClick={() => setShow(!show)}>OPEN MODAL TEST BUTTON</button>
        <Modal onClose={showModal} show={show}>
          <form className={styles.formContainer} onSubmit={(e) => onFormSubmit(e)}>
            <label>
              <h2>Product Title:</h2>
              <input className={styles['form-product-title']} type="text" value={productTitle} onChange={handleProductTitleChange} />
            </label>

            <label>
              <h2>Product Description:</h2>
              <textarea className={styles['form-product-description']} type="text" value={productDescription} onChange={handleProductDescriptionChange} />
            </label>

            <label>
              <h2>Category:</h2>
              <input className={styles['form-product-title']} type="text" value={productCategory} onChange={handleProductCategoryChange} />
            </label>
            <h2>Upload Picture:</h2>
            <input type="file" multiple="multiple" onChange={onFileChange}/>
            <button className={styles['form-submit']} type="submit">SUBMIT</button>
          </form>

        </Modal>
      </section>
    )
  }
};

export default ProfilePage;