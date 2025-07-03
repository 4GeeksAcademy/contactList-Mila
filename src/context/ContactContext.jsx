import React, { createContext, useEffect, useState } from 'react';

export const ContactContext = createContext();
const API = 'https://playground.4geeks.com/contact';
const AGENDA_SLUG = 'milangelawpz';

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts`);
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      console.error('Error al obtener contactos:', err);
    }
  };

  const createAgenda = async () => {
    try {
      const res = await fetch('https://playground.4geeks.com/contact/agendas/milangelawpz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agenda_slug: AGENDA_SLUG })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.warn('ℹ️ La agenda puede que ya exista:', errorData);
      } else {
        console.log(`✅ Agenda '${AGENDA_SLUG}' creada exitosamente.`);
      }
    } catch (err) {
      console.error('❌ Error al crear agenda:', err);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await createAgenda();
      await fetchContacts();
    };
    initialize();
  }, []);

  const addContact = async (contact) => {
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG })
      });
      if (res.ok) fetchContacts();
    } catch (err) {
      console.error('Error al agregar contacto:', err);
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG })
      });
      if (res.ok) fetchContacts();
    } catch (err) {
      console.error('Error al actualizar contacto:', err);
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchContacts();
    } catch (err) {
      console.error('Error al eliminar contacto:', err);
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};