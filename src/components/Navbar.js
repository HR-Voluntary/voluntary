import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./Navbar.module.css";
import { useLocation } from "react-router";
import { logout } from "../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../pages/ProfilePage/Modal/Modal";
import PostForm from "../pages/ProfilePage/PostForm";
import useUploadImage from "./hooks/useUploadImage";

const Navbar = () => {
  const { currentUserData } = useAuth();
  const location = useLocation();
  const [currentImage, setCurrentImage] = useState(
    require("./utils/Mascot.png")
  );
  const { onFileChange, onFormSubmitGeneratePhotoUrl } = useUploadImage();
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [user, setUser] = useState(null);

  const userData = useAuth();
  const placeholderId = userData?.currentUser?.uid;

<<<<<<< HEAD
  const setUserState = (userId) => {
    axios.get(`http://localhost:3001/user/profile/${userId}`)
    .then(res => {
      setUser(res.data[0]);
    })
    .catch(e => console.log(e))
  }

  const toggleModal = () => {
    setShowModalWindow(!showModalWindow);
  };
=======
  // console.log(currentImage)
>>>>>>> main

  useEffect(() => {
    if (currentUserData?.photo) {
      setCurrentImage(currentUserData?.photo);
    }
  }, [currentUserData]);

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value)
  }
  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value)
  }
  const handleProductTitleChange = (e) => {
    setProductTitle(e.target.value)
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    const arrOfS3SuccessPuts = await onFormSubmitGeneratePhotoUrl();
    let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
      return s3url.config.url.split('?')[0];
    });
    let itemToPost = {
      category: productCategory,
      sellerInfo: user?.id,
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
    setShowModalWindow(!showModalWindow);
  }

  if (
    location.pathname === "/" ||
    location.pathname === "/Register" ||
    location.pathname === "/Reset"
  ) {
    return null;
  }

  return (
<<<<<<< HEAD
    <>
      <div className={styles.navbar}>
        <span className={styles.logo}>
          <Link className={styles.logo} to="/ListingPage">
            <img
              className={styles.image}
              src={require("./utils/Mascot.png")}
              alt=""
            ></img>
            <span className={styles.logoText}>Voluntary</span>
=======
    <div className={styles.navbar}>
      <span className={styles.logo}>
        <Link className={styles.logo} to='/ListingPage'>
          <img className={styles.image} src={require('./utils/Mascot.png')} alt=''></img>
          <span className={styles.logoText}>Voluntary</span>
        </Link>
      </span>
      <ul className={styles.navbar_list}>
        <li className={styles.navbar_list_item}>
          <Link className={styles.link} to='/ProfilePage'>
            <img src={currentImage} alt='' className={styles.navbar_avatar} />
>>>>>>> main
          </Link>
        </span>
        <ul className={styles.navbar_list}>
          <li className={styles.navbar_list_item}>
            <button onClick={toggleModal}>List Item</button>
          </li>
          <li className={styles.navbar_list_item}>
            <Link className={styles.link} to="/ProfilePage">
              <img src={currentImage} alt="" className={styles.navbar_avatar} />
            </Link>
          </li>
          <li className={styles.navbar_list_item}>
            <Link className={styles.link} to="/ProfilePage">
              {currentUserData?.name}
            </Link>
          </li>
          <li>
            <button className={styles.navbar_logout_button} onClick={logout}>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <Modal onClose={toggleModal} show={showModalWindow}>
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
    </>
  );
};

export default Navbar;
