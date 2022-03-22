import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router'
import Carousel from 'react-elastic-carousel';
import styles from './ProfilePage.module.css';
import Modal from './Modal/Modal.js';
import './ProfilePageCarousel.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import useUploadImage from '../../components/hooks/useUploadImage';
import { useAuth } from '../../contexts/AuthContext'

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [editProductId, setEditProductId] = useState('');
  const navigate = useNavigate();
  const userData = useAuth();
  console.log(userData);
  // S3 photo hook:
  const { onFileChange, onFormSubmitGeneratePhotoUrl } = useUploadImage();

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

  useEffect(() => {
  setUserState(placeholderId)
  //   axios.get(`http://localhost:3001/user/profile/1AOjnwnoc5bxD1u3VBiaNzKYL2k1`)
  //   .then(res => {
  //     console.log(res.data)
  //     setUser(res.data[0]);
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch(e => console.log(e))
  }, []);



  function showModal() {
    setShow(!show);
  };

  function showModal1() {
    setShow1(!show1);
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
  // const arrOfS3SuccessPuts = await onFormSubmitGeneratePhotoUrl();
  // let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
  //   // This map returns the exact URL we can use as an img tag's source:
  //   return s3url.config.url.split('?')[0];
  // });
  console.log('EDIT FORM FIRING')


  axios({
    url: `http://localhost:3001/item/itm/${editProductId}`,
    method: 'PUT',
    data: {
      category: productCategory,
      sellerInfo: user.id,
      // image:s3photoUrlsArray,
      description: productDescription,
      name: productTitle
    }
  })
  .then(() => {
    setUserState(placeholderId);
  })


  setProductTitle('');
  setProductDescription('');
  setProductCategory('');
  setShow1(!show1);
}

async function onFormSubmit(e) {
  e.preventDefault();
  const arrOfS3SuccessPuts = await onFormSubmitGeneratePhotoUrl();
  let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
    // This map returns the exact URL we can use as an img tag's source:
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
  setShow(!show);
}

  if (user === null) {
    return null;
  } else {
    return (
      <section>
        <div className={styles.navbar}>
          <button onClick={() => setShow(!show)} className={styles['list-item-btn']}>List Item</button>
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
                <div className={styles.mainContainer}>
                  {console.log(card)}
                  <div className={styles.dotStatusContainer}>
                    <div className={(card.isActive) ? styles.active : styles.notActive} /> {card.isActive ? 'Item is active' : 'Item is not active'}
                  </div>
                  <div key={`product-${i}`} className={styles.card}>
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
                      }} >See Listing</button>
                      <button onClick={() => {
                        setShow1(!show1)
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


        {/* MODAL TO EDIT A PRODUCT */}
        <Modal onClose={showModal1} show={show1}>
          <form className={styles.formContainer} onSubmit={(e) => onEditFormSubmit(e, editProductId)}>

            <label>
              <h2>Product Title:</h2>
              <input
                className={styles['form-product-title']}
                type="text"
                value={productTitle}
                onChange={handleProductTitleChange}
              />
            </label>

            <label>
              <h2>Product Description:</h2>
              <textarea
                className={styles['form-product-description']}
                type="text"
                value={productDescription}
                onChange={handleProductDescriptionChange}
              />
            </label>

            <label>
              <h2>Category:</h2>
              <input
                className={styles['form-product-title']}
                type="text" value={productCategory}
                onChange={handleProductCategoryChange}
              />
            </label>

            <h2>Upload Picture:</h2>
            <input type="file" multiple="multiple" onChange={onFileChange}/>

            <button className={styles['form-submit']} type="submit">SUBMIT</button>
          </form>
        </Modal>



            {/* MODAL TO ADD A PRODUCT */}
        <Modal onClose={showModal} show={show}>
          <form className={styles.formContainer} onSubmit={(e) => onFormSubmit(e)}>

            <label>
              <h2>Product Title:</h2>
              <input
                className={styles['form-product-title']}
                type="text"
                value={productTitle}
                onChange={handleProductTitleChange}
              />
            </label>

            <label>
              <h2>Product Description:</h2>
              <textarea
                className={styles['form-product-description']}
                type="text"
                value={productDescription}
                onChange={handleProductDescriptionChange}
              />
            </label>

            <label>
              <h2>Category:</h2>
              <input
                className={styles['form-product-title']}
                type="text" value={productCategory}
                onChange={handleProductCategoryChange}
              />
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