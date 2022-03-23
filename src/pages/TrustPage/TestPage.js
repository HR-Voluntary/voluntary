import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllRatings from './AllRatings.js'

const fromIrving = {type: 'buyer', transaction: 'complete', uid: '1AOjnwnoc5bxD1u3VBiaNzKYL2k1'};

function ReviewsModal() {
  const [show, setShow] = useState(false);

  function toggleModal() {
    setShow(!show);
  }

  return (
    <>
      <button onClick={toggleModal}>
        Mark As Sold
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllRatings onClick={toggleModal} userInfo={fromIrving}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewsModal;






