import useContacts from '../hooks/useContacts';
import { Button } from 'react-bootstrap';
import AddContactModal from './AddContactModal';
import { useState } from 'react';

const ContactManager = () => {
  const { contacts, addContact } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  return (
    <div>
      <h1>Contact Manager</h1>
      <Button onClick={handleOpen}>Add Contact</Button>
      <AddContactModal
        show={showModal}
        handleClose={handleClose}
        handleAddContact={addContact}
      />
      {contacts.length === 0 && <p>No contacts found</p>}
    </div>
  );
};

export default ContactManager;
