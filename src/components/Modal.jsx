import React from 'react';

const Modal = ({ children, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{children}</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;