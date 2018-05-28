import React, { Component } from 'react';


const Modal = (props) => {
  return (
    <div className={[props, 'modal'].join(' ')}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <strong>Correct / Incorrect </strong>
          <button className="modal-close is-large" aria-label="close">Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;