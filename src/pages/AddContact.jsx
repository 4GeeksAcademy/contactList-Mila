import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext';
import { Link } from 'react-router-dom';

const AddContact = () => {
  const { addContact, updateContact, contacts } = useContext(ContactContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (id) {
      const existing = contacts.find(c => c.id.toString() === id);
      if (existing) setFormData(existing);
    }
  }, [id, contacts]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) updateContact(formData.id, formData);
    else addContact(formData);
    navigate('/');
  };

  return (
      <div className = "add-contact-container">
      <form className="add-contact-form" onSubmit={handleSubmit}>
      <h2>{id ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
      <label>Nombre Completo</label>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
      <label>E-mail</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <label>Teléfono</label>
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" />
      <label>Dirección</label>
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" required />
      <button type="submit">{id ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <Link className="back-link" to="/">volver a la lista de contactos</Link>
      </div>
  );
};

export default AddContact;