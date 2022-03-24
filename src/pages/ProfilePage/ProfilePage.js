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
import newStyles from './ProfilePageNew.module.css';

// Components:
import ProfileProductCard from './ProfileProductCard';
import EditForm from './EditForm';
import PostForm from './PostForm';


const ProfilePage = () => {
  const [postModalWindow, setPostModalWindow] = useState(false);
  const [editModalWindow, setEditModalWindow] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [editProductId, setEditProductId] = useState('');
  const navigate = useNavigate();

  // S3 photo hook. When a user opens a POST ITEM modal and uploads a photo, onFileChange changes uploaded photo from Image data to Base64-encoded data, which is what we need in order to post to S3. The onFormSubmit data retrieves S3 POST URLs from S3, makes a POST request for each Photo/S3 URL pair, and returns a completed S3 Photo URL array that we can then POST to our ITEM/PRODUCT backend.
  const { onFileChange, onFormSubmitGeneratePhotoUrl } = useUploadImage();

  const {
    allItemsForSale,
    allUsers,
    currentUser,
    currentUserData,
    setUserActiveItems,
    setUserInactiveItems,
    userProfile,
    userActiveItems,
    userInactiveItems,
    loadProfileDataFromApi
  } = useAuth();

  const clearForms = () => {
    setProductTitle('');
    setProductDescription('');
    setProductCategory('');
    setEditProductId('');
  };

  function showPostProductModal() {
    setPostModalWindow(!postModalWindow);
  };

  function showEditModal() {
    setEditModalWindow(!editModalWindow);
    clearForms();
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
    .then(() => {
      const userSpecificItems = userProfile.userItems;
      userSpecificItems.map(item => {
        if (item.id === itemId) {
          item.isActive = !activeStatus;
          return item;
        } else {
          return item;
        }
      });

      const activeItems = userSpecificItems.filter(item => item.isActive)
      const inactiveItems = userSpecificItems.filter(item => !item.isActive)
      setUserActiveItems(activeItems);
      setUserInactiveItems(inactiveItems);
    })
    .catch((e) => console.log(e));
  }

  // CRUD operation. loadProfileDataFromApi gets user data and sets state, which re-renders this page:
  function onDeleteClickHandler(itemIdToDelete) {
    axios({
      url: `http://localhost:3001/item/${itemIdToDelete}`,
      method: 'DELETE',
      data: { id: itemIdToDelete }
    })
    .then(() => {
      loadProfileDataFromApi(userProfile.id);
    })
    .catch((e) => console.log(e));
  }

  // CRUD operation. loadProfileDataFromApi gets user data and sets state, which re-renders this page:
  async function onEditFormSubmit(e, editProductId) {
    e.preventDefault();
    axios({
      url: `http://localhost:3001/item/itm/${editProductId}`,
      method: 'PUT',
      data: {
        category: productCategory,
        sellerInfo: userProfile.id,
        description: productDescription,
        name: productTitle
      }
    })
    .then(() => {
      loadProfileDataFromApi(userProfile.id);
    });
    clearForms();
    setEditModalWindow(!editModalWindow);
  };

  // CRUD operation. loadProfileDataFromApi gets user data and sets state, which re-renders this page:
  async function onFormSubmit(e) {
    e.preventDefault();
    const arrOfS3SuccessPuts = await onFormSubmitGeneratePhotoUrl();
    let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
      return s3url.config.url.split('?')[0];
    });
    let itemToPost = {
      category: productCategory,
      sellerInfo: userProfile.id,
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
      loadProfileDataFromApi(userProfile.id);
    })
    clearForms();
    setPostModalWindow(!postModalWindow);
  };

  if (userProfile === null) {
    return null;
  } else {
    return (
      <section>
        <div className={newStyles.focusContainer}>
            <div className={newStyles.mainProductContainer}>
                <div className={newStyles.mainProductContentContainer}>

                  <h3>Previously Donated Products</h3>


                  {userInactiveItems.map(item => {
                    return (
                      <div className={newStyles.row}>
                      <div className={newStyles.imageContainer}>
                        <img src={item.image[0]} alt="Inactive Products"/>
                      </div>
                      <div className={newStyles.textContainer}>
                        <h3>{ item.name }</h3>
                        <div className={newStyles.category}>{ item.category }</div>
                        <div
                          className={newStyles.textDescription}
                        >
                          { item.description }
                        </div>
                        <div className={newStyles.buttonContainer}>
                          <button onClick={() => onActiveClickHandler(item.id, item.isActive)}>Active</button>
                          <button onClick={() => {
                          setEditModalWindow(!editModalWindow)
                          setProductTitle(item.name);
                          setProductDescription(item.description);
                          setProductCategory(item.category);
                          setEditProductId(item.id);
                          }}>
                          Edit
                          </button>
                          <button onClick={() => onDeleteClickHandler(item.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                      );
                    }
                  )}
                </div>

                <div className={newStyles.mainProductContentContainer}>
                  <h3>Currently Active Products</h3>
                  {userActiveItems.map(item => {
                    return (
                      <div className={newStyles.row}>
                      <div className={newStyles.imageContainer}>
                        <img src={item.image[0]} alt="Inactive Products"/>
                      </div>
                      <div className={newStyles.textContainer}>
                        <h3>{ item.name }</h3>
                        <div className={newStyles.category}>{ item.category }</div>
                        <div
                          className={newStyles.textDescription}
                        >
                          { item.description }
                        </div>
                        <div className={newStyles.buttonContainer}>
                          <button onClick={() => onActiveClickHandler(item.id, item.isActive)}>Active</button>
                          <button onClick={() => {
                          setEditModalWindow(!editModalWindow)
                          setProductTitle(item.name);
                          setProductDescription(item.description);
                          setProductCategory(item.category);
                          setEditProductId(item.id);
                          }}>
                          Edit
                          </button>
                          <button onClick={() => onDeleteClickHandler(item.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                      );
                    }
                  )}
                </div>
            </div>
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
    );
  }
};

export default ProfilePage;