import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './Thumbs.module.css';
import AllRatings from './AllRatings.js'
import {useAuth} from '../../contexts/AuthContext';

// const fromIrving = {type: 'buyer', uid: '1AOjnwnoc5bxD1u3VBiaNzKYL2k1'};

function ReviewsModal({ uid, type }) {
  const { modal, setModal } = useAuth();
  const [show, setShow] = useState(true);
  
  console.log('SHOW', uid);

  function toggleModal() {
    setShow(!show);
  }

  return (
    // <div className={styles.allContainer}>
    //   <button onClick={toggleModal}>
    //     Mark As Sold
    //   </button>

      <Modal
        show={show}
        onHide={() => {setModal(false)}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Ratings Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllRatings onClick={toggleModal} uid={uid} type={type}/>
        </Modal.Body>
      </Modal>
    // </div>
  );
}

export default ReviewsModal;






