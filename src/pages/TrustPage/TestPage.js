import React, { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import styles from './Thumbs.module.css';
import Modal from '../../pages/ProfilePage/Modal/Modal.js';
import AllRatings from './AllRatings.js'
import {useAuth} from '../../contexts/AuthContext';


function ReviewsModal({ uid, type }) {
  const { modal, setModal } = useAuth();
  // const [show, setShow] = useState(false);
  // uid = '1AOjnwnoc5bxD1u3VBiaNzKYL2k1';
  // type = 'buyer';
  console.log('SHOW', uid);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <div>
      {/* <button onClick={toggleModal}>
        Temp Button
      </button> */}

      <Modal
        show={modal}
        onClose={toggleModal}
      ><AllRatings onClick={toggleModal} uid={uid} type={type}/>
      </Modal>
     </div>
  );
}

export default ReviewsModal;
