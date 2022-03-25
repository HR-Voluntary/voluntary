import React, { useEffect, useRef } from 'react';
import styles from './TrustModal.module.css';

const Modal = (props) => {
  const elInput = useRef(null);

  useEffect(() => {
    if (elInput.current !== null) {
      // elInput.current.style.left = '50%';
      elInput.current.style.display = 'flex';
      elInput.current.style.justifyContent = 'center';
      elInput.current.style.alignItems = 'center';
    }
  }, [props.onClose]);

  const classes = `${props.className}` + ` jim-modal animate`;

  if (!props.show) {
    // document.body.setAttribute('style', '');
    // window.scrollTo(0, this.windowOffset);
    return null;
  } else {
    // this.windowOffset = window.scrollY;
    // document.body.setAttribute('style', `position: fixed; top: -${this.windowOffset}px; left: 0; right: 0;`);
    return (
      <>
        <div ref={elInput} className={styles['jim-modal']}>
          {props.children}
          {/* MIGHT BE BROKEN FROM CSS MODULES BC ID NOT CLASS...  */}
          {/* <button id={styles['modal-close-btn']} className={styles.btn} onClick={props.onClose}>x</button> */}
        </div>
        <div className={styles['jim-modal-backdrop']} onClick={props.onClose}></div>
      </>
    )
  }
};

export default Modal;