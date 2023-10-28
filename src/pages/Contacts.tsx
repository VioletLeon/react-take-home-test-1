import ContactManager from '../components/ContactManager';
import ContactFormModal from '../components/ContactFormModal';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import useContacts from '../hooks/useContacts';

const Contacts = () => {
  const { contacts, addContact, editContact, deleteContact } = useContacts();
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const handleAddModalClose = () => setShowAddContactModal(false);
  const handleAddModalOpen = () => setShowAddContactModal(true);

  return (
    <>
      <h1>Contacts</h1>
      <Container>
        <Button variant="primary" onClick={handleAddModalOpen}>
          Add Contact
        </Button>
      </Container>
      <ContactFormModal
        addContact={addContact}
        show={showAddContactModal}
        editMode={false}
        handleClose={handleAddModalClose}
      />
      <ContactManager
        contacts={contacts}
        editContact={editContact}
        deleteContact={deleteContact}
      />
    </>
  );
};

export default Contacts;
