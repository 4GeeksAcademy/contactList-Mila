import React, { useContext } from 'react';
import { ContactContext } from '../context/ContactContext';
import ContactCard from '../components/ContactCard';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  return (
    
      <div className="contact-page">
      <h1>Contactos</h1>
      <div className="add-button"><Link to="/add" className="add-contact-btn">Agregar Contacto</Link></div>
      <div className="contact-list-container"> 
        {contacts.length === 0 ? (
          <p>No hay contactos.</p>
        ) : (
          contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;