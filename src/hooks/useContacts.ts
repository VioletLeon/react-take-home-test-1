import { useState, useEffect } from 'react';
import {
  apiAddContact,
  apiDeleteContact,
  apiFetchAllContacts,
  apiUpdateContact,
  IContact,
} from '../data/contacts';

const useContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await apiFetchAllContacts();
      setContacts(contacts);
    };

    fetchContacts();
  }, []);

  return { contacts };
};

export default useContacts;
