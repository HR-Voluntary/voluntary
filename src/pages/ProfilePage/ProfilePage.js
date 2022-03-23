import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router'
import Carousel from 'react-elastic-carousel';
import styles from './ProfilePage.module.css';
import Modal from './Modal/Modal.js';
import './ProfilePageCarousel.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import useUploadImage from '../../components/hooks/useUploadImage';
import { useAuth } from '../../contexts/AuthContext';

// Components:
import ProfileProductCard from './ProfileProductCard';
import EditForm from './EditForm';
import PostForm from './PostForm';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [postModalWindow, setPostModalWindow] = useState(false);
  const [editModalWindow, setEditModalWindow] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [editProductId, setEditProductId] = useState('');
  const navigate = useNavigate();

  // S3 photo hook:
  const { onFileChange, onFormSubmitGeneratePhotoUrl } = useUploadImage();

  const userData = useAuth();
  // Replace with dynamic data once routing set up
  const placeholderId = userData?.currentUser?.uid;

  // Function that retrieves user data:
  const setUserState = (userId) => {
    axios.get(`http://localhost:3001/user/profile/${userId}`)
    .then(res => {
      setUser(res.data[0]);
    })
    .catch(e => console.log(e))
  }

  // show1 edit
  // show is list item

  useEffect(() => {
    if (placeholderId) {
      // Axios Call to get user/item data here:
      setUserState(placeholderId)
    }
  }, [placeholderId]);

  function showPostProductModal() {
    setPostModalWindow(!postModalWindow);
  };

  function showEditModal() {
    setEditModalWindow(!editModalWindow);
    setProductTitle('');
    setProductDescription('');
    setProductCategory('');
    setEditProductId('');
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

  function onActiveClickHandler(itemId, activeStatus) {
    axios({
      url: `http://localhost:3001/item/itm/${itemId}`,
      method: 'PUT',
      data: { isActive: !activeStatus }
    })
    .then(() => setUserState(placeholderId))
    .catch((e) => console.log(e));
  }

  function onDeleteClickHandler(itemIdToDelete) {
    axios({
      url: `http://localhost:3001/item/${itemIdToDelete}`,
      method: 'DELETE',
      data: { id: itemIdToDelete }
    })
    .then(() => setUserState(placeholderId))
    .catch((e) => console.log(e));
  }

  async function onEditFormSubmit(e, editProductId) {
    e.preventDefault();
    axios({
      url: `http://localhost:3001/item/itm/${editProductId}`,
      method: 'PUT',
      data: {
        category: productCategory,
        sellerInfo: user.id,
        description: productDescription,
        name: productTitle
      }
    })
    .then(() => {
      setUserState(placeholderId);
    });
    setProductTitle('');
    setProductDescription('');
    setProductCategory('');
    setEditModalWindow(!editModalWindow);
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    const arrOfS3SuccessPuts = await onFormSubmitGeneratePhotoUrl();
    let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
      return s3url.config.url.split('?')[0];
    });
    let itemToPost = {
      category: productCategory,
      sellerInfo: user.id,
      image:s3photoUrlsArray,
      description: productDescription,
      name: productTitle
    };
    axios({
      url: 'http://localhost:3001/item/',
      method: 'POST',
      data: { itemToPost }
    })
    .then(() => {
      setUserState(placeholderId);
    })
    setProductTitle('');
    setProductDescription('');
    setProductCategory('');
    setPostModalWindow(!postModalWindow);
  }

  if (user === null) {
    return null;
  } else {
    return (
      <section>
        {/* <div className={styles.navbar}>
          <button onClick={() => setPostModalWindow(!postModalWindow)} className={styles['list-item-btn']}>List Item</button>
        </div> */}

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
                {user.userItems.map((card, index) =>
                  <ProfileProductCard
                    card={card}
                    index={index}
                    navigate={navigate}
                    setEditModalWindow={setEditModalWindow}
                    editModalWindow={editModalWindow}
                    setProductTitle={setProductTitle}
                    setProductDescription={setProductDescription}
                    setProductCategory={setProductCategory}
                    setEditProductId={setEditProductId}
                    onDeleteClickHandler={onDeleteClickHandler}
                    onActiveClickHandler={onActiveClickHandler}
                  />
                )}
              </Carousel>
            </div>
          </div>
          {/* <div className={styles['cards-container']}>
            <h2>Claimed</h2>
            <div className={styles['cards-container-two']}>
              <Carousel verticalMode itemsToShow={4}>
                {user.claimed.map((card, i) =>
                  <div key={`claimed-${i}`} className={styles.card}></div>
                )}
              </Carousel>
            </div>
          </div> */}
        </div>

        {/* MODAL TO EDIT A PRODUCT */}
        <Modal onClose={showEditModal} show={editModalWindow}>
          <EditForm
            onEditFormSubmit={onEditFormSubmit}
            editProductId={editProductId}
            productTitle={productTitle}
            handleProductTitleChange={handleProductTitleChange}
            productDescription={productDescription}
            handleProductDescriptionChange={handleProductDescriptionChange}
            productCategory={productCategory}
            handleProductCategoryChange={handleProductCategoryChange}
            onFileChange={onFileChange}
          />
        </Modal>

        {/* MODAL TO ADD A PRODUCT */}
        <Modal onClose={showPostProductModal} show={postModalWindow}>
          <PostForm
            onFormSubmit={onFormSubmit}
            productTitle={productTitle}
            handleProductTitleChange={handleProductTitleChange}
            productDescription={productDescription}
            onChange={handleProductDescriptionChange}
            handleProductDescriptionChange={handleProductDescriptionChange}
            productCategory={productCategory}
            handleProductCategoryChange={handleProductCategoryChange}
            onFileChange={onFileChange}
          />
        </Modal>
      </section>
    )
  }
};

export default ProfilePage;