import { useState, useEffect, useMemo } from 'react';
import {
  apiAddContact,
  apiDeleteContact,
  apiFetchAllContacts,
  apiUpdateContact,
} from '../data/contacts';
import type { IContact } from '../data/contacts';
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

  const sortedContacts = useMemo(() => {
    return contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts]);

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

  return {
    contacts: sortedContacts,
    error,
    addContact,
    editContact,
    deleteContact,
  };
};

export default useContacts;
