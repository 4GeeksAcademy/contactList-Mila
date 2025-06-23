import React, { useContext, useState } from 'react';
import { ContactContext } from '../context/ContactContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { FaTrash, FaPen } from 'react-icons/fa';

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="contact-card">
      <img src="https://photos.puppyspot.com/breeds/258/card/500420369.jpg" alt={contact.name} />
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p><i className="fas fa-map-marker-alt" /> {contact.address}</p>
        <p><i className="fas fa-phone" /> {contact.phone}</p>
        <p><i className="fas fa-envelope" /> {contact.email}</p>
      </div>
      <div className="contact-actions">
        <button onClick={() => navigate(`/edit/${contact.id}`)}><FaPen /></button>
        <button onClick={() => setShowModal(true)}><FaTrash /></button>
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            deleteContact(contact.id);
            setShowModal(false);
          }}
        >
          ¿Estás seguro de eliminar este contacto?
        </Modal>
      )}
    </div>
  );
};

export default ContactCard;