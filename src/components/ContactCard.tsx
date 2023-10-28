import { IContact } from '../data/contacts';
import { Button, Card, Image } from 'react-bootstrap';
import { useState } from 'react';
import ContactFormModal from './ContactFormModal';

type Props = {
  contact: IContact;
  deleteContact: (id: string) => Promise<void>;
  editContact: (contact: IContact) => Promise<void>;
};

const ContactCard = ({ contact, deleteContact, editContact }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEditContact = () => {
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <Card style={{ width: '18rem', margin: '1rem', minHeight: '20rem' }}>
      <Card.Body>
        <Image
          src={`https://picsum.photos/100/100`}
          roundedCircle
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            marginBottom: '1rem',
          }}
        />
        <Card.Title>Name: {contact.name}</Card.Title>
        <Card.Subtitle className="text-muted">
          {contact.phone && `Phone: ${contact.phone}`}
        </Card.Subtitle>
        <Card.Text>{contact.email && `E-mail: ${contact.email}`}</Card.Text>
        <Card.Text>{contact.age && `Age: ${contact.age}`}</Card.Text>
        <Button
          variant="danger"
          disabled={deleteLoading}
          onClick={async () => {
            setDeleteLoading(true);
            await deleteContact(contact.id);
            setDeleteLoading(false);
          }}
        >
          Delete
        </Button>
        <Button variant="primary" onClick={handleEditContact}>
          Edit
        </Button>
      </Card.Body>

      <ContactFormModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        editContact={editContact}
        editMode={true}
        contactToEdit={contact}
      />
    </Card>
  );
};

export default ContactCard;
