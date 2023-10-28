import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IContact } from '../data/contacts';

type ContactFormState = Omit<IContact, 'id'> & { birthday?: Date };
type ContactFormProps = {
  formData: ContactFormState;
  onChange: (newFormData: ContactFormState) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          name="birthday"
          onChange={(e) =>
            onChange({
              ...formData,
              birthday: new Date(e.target.value),
            })
          }
        />
      </Form.Group>
    </Form>
  );
};

type ContactFormModalProps = {
  show: boolean;
  handleClose: () => void;
  addContact?: (newContact: IContact) => Promise<void>;
  editContact?: (updatedContact: IContact) => Promise<void>;
  editMode: boolean;
  contactToEdit?: IContact;
};

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  show,
  handleClose,
  addContact = () => {},
  editContact = () => {},
  editMode,
  contactToEdit,
}) => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string>('');

  // If in edit mode, populate the form with existing contact data
  useEffect(() => {
    if (editMode && contactToEdit) {
      setFormData(contactToEdit);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [editMode, contactToEdit]);

  const validateForm = () => {
    if (!formData.name) {
      setValidationErrors('Name is required');
      setSaveLoading(false);
      return false;
    }

    if (formData.email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const isValidEmail = emailRegex.test(formData.email);
      if (!isValidEmail) {
        setValidationErrors('Email is invalid');
        setSaveLoading(false);
        return false;
      }
    }

    if (formData.phone) {
      const phoneRegex = /^\d{10}$/;
      const isValidPhone = phoneRegex.test(formData.phone);
      if (!isValidPhone) {
        setValidationErrors('Phone is invalid');
        setSaveLoading(false);
        return false;
      }
    }

    if (formData.birthday) {
      if (formData.birthday > new Date()) {
        setValidationErrors('Birthday cannot be in the future');
        setSaveLoading(false);
        return false;
      }

      // validate if real date
      const isValidDate = !isNaN(formData.birthday.getTime());
      if (!isValidDate) {
        setValidationErrors('Birthday is invalid');
        setSaveLoading(false);
        return false;
      }
    }

    setValidationErrors('');
    return true;
  };

  const handleSave = async () => {
    setSaveLoading(true);

    if (!validateForm()) return;

    if (editMode) {
      if (formData.birthday) {
        formData.age =
          new Date().getFullYear() - formData.birthday.getFullYear();
      }

      await editContact({ ...formData } as IContact);
    } else {
      const newContact = { ...formData, id: '' };

      if (formData.birthday) {
        newContact.age =
          new Date().getFullYear() - formData.birthday.getFullYear();
      }

      await addContact(newContact);
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
    setSaveLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editMode ? 'Edit Contact' : 'Add New Contact'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm formData={formData} onChange={setFormData} />
        {validationErrors.length > 0 && (
          <p
            className="text-danger fw-bold"
            style={{
              marginTop: '0.5rem',
            }}
          >
            {validationErrors}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saveLoading}>
          {editMode ? 'Save Changes' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactFormModal;
