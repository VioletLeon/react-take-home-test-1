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
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await apiFetchAllContacts();
        setContacts([...fetchedContacts]);
      } catch (error) {
        setError('Error fetching contacts');
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      setError('');
    }
  }, [error]);

  useEffect(() => {}, [contacts]);

  const addContact = async (newContact: IContact) => {
    newContact.id = generateUUID();
    try {
      await apiAddContact(newContact);
      setContacts([...contacts, newContact]);
    } catch (error) {
      setError('Error adding contact');
    }
  };

  const editContact = async (updatedContact: IContact) => {
    const index = contacts.findIndex((x) => x.id === updatedContact.id);
    const newContacts = [...contacts];
    newContacts[index] = updatedContact;
    try {
      await apiUpdateContact(updatedContact);
      setContacts(newContacts);
    } catch (error) {
      setError('Error editing contact');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await apiDeleteContact(id);
      setContacts(contacts.filter((x) => x.id !== id));
    } catch (error) {
      setError('Error deleting contact');
    }
  };

  return { contacts, error, addContact, editContact, deleteContact };
};

export default useContacts;
