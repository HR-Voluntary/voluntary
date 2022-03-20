import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import styles from './ProfilePage.module.css';
import khristian from './images/khristian.jpeg';
import Modal from './Modal/Modal.js';
import './ProfilePageCarousel.css';
import axios from 'axios';


const ProfilePage = () => {
  const [user, setUser] = useState({ name: 'Rob Cherry T.', type: 'Individual', location: 'Los Angeles', votes: 6, trustLevel: 5, listings: [1, 2, 3, 4, 5, 6], claimed: [1, 2, 3, 4] });
  const [show, setShow] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');

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


  // IMAGE UPLOAD
  const [imageArray, setImageArray] = useState([]);
  const [completedImgArray, setCompletedImgArray] = useState([]);

  async function onFileChange (e) {
    e.persist();
  let arrOfFiles = Object.values(e.target.files);
  function getBase64(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        }
      });
    };
    const promiseArray = [];
    arrOfFiles.forEach(file => promiseArray.push(getBase64(file)));
    let arrOfBlobs = await Promise.all(promiseArray);
    setImageArray([...imageArray].concat(arrOfBlobs));
  };

  async function onFormSubmit (e) {
    e.preventDefault();
    e.persist();
  // STEP 1: Declare an array to hold promise values of unresolved API calls:
    let arrOfS3UrlPromises = [];
  // STEP 2: Loop through imgArray (i.e. your state full of base64 images):
    imageArray.forEach(img => {
      // For each image, retrieve an S3 URL to upload that image to:
      let getUrl = axios({ method: 'GET', url: 'http://localhost:3000/s3Url' }).then(data => data.data);
      arrOfS3UrlPromises.push(getUrl);
    });
    // STEP 3: Wait for those axios requests to resolve, giving you the final S3 signed URL array:
    let arrOfS3Urls = await Promise.all(arrOfS3UrlPromises);
  // STEP 4: Declare an array to hold PUT axios requests to the above URL:
    let arrOfS3SuccessPutPromise = [];
  // STEP 5: Loop through above S3 signed URLs
    arrOfS3Urls.forEach((s3url, index) => {
      const base64 = imageArray[index];
  // STEP 6: Use the Buffer object (from Node, more information below)
      const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  // STEP 7: Post image to S3
      let successCall = axios({
        method: 'PUT',
        url: s3url,
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Encoding': 'base64'
        },
        data: base64Data
      });
      arrOfS3SuccessPutPromise.push(successCall);
    });

    let arrOfS3SuccessPuts = await Promise.all(arrOfS3SuccessPutPromise);

  // STEP 8: Once the above PUT requests resolve, arrOfS3SuccessPuts will contain all img URLs.

  // This map returns the exact URL we can use as an img tag's source:
    let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
     // This map returns the exact URL we can use as an img tag's source:
      return s3url.config.url.split('?')[0];
    });
    setCompletedImgArray(s3photoUrlsArray);
  };


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