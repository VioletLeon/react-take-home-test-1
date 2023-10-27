import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IContact } from '../data/contacts';

type ContactFormState = Omit<IContact, 'id'>;
type Props = {
  show: boolean;
  handleClose: () => void;
  handleAddContact: (contact: IContact) => void;
};

const AddContactModal = ({ show, handleClose, handleAddContact }: Props) => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    handleAddContact(formData as IContact);
    setFormData({ name: '', email: '', phone: '' });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContactModal;
