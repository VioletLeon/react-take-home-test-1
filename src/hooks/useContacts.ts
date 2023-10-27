import { useState, useEffect } from 'react';
import {
  apiAddContact,
  apiDeleteContact,
  apiFetchAllContacts,
  apiUpdateContact,
  IContact,
} from '../data/contacts';
import { generateUUID } from '../util/guid';

const useContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await apiFetchAllContacts();
      setContacts(contacts);
    };

    fetchContacts();
  }, []);

  const addContact = async (newContact: IContact) => {
    newContact.id = generateUUID();
    setContacts([...contacts, newContact]);
    await apiAddContact(newContact);
  };

  const editContact = async (updatedContact: IContact) => {
    const index = contacts.findIndex((x) => x.id === updatedContact.id);
    const newContacts = [...contacts];
    newContacts[index] = updatedContact;
    setContacts(newContacts);
    await apiUpdateContact(updatedContact);
  };

  const getContact = async (id: string) => {
    const index = contacts.findIndex((x) => x.id === id);
    return contacts[index];
  };

  const deleteContact = async (id: string) => {
    setContacts(contacts.filter((x) => x.id !== id));
    await apiDeleteContact(id);
  };

  return { contacts, addContact, getContact, editContact, deleteContact };
};

export default useContacts;
