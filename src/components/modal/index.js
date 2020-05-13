import React from "react";

const Modal = ({ show, title, content, actions, onDismiss }) => {
  if (!show) return null;
  return(
    <div onClick={onDismiss} className="modal">
      <div className="backdrop">
        <div onClick={e => e.stopPropagation()} className="modal-content">
          <span onClick={onDismiss} className="close">
            &times;
          </span>
          <div className="modal-header">
            <h2 className="title">{title}</h2>
          </div>
          <div className="content">{content}</div>
          <div className="actions">{actions}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
