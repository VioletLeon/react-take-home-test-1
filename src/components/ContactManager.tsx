import { Col, Container, Row } from 'react-bootstrap';
import type { IContact } from '../data/contacts';
import ContactCard from './ContactCard';

type Props = {
  contacts: IContact[];
  editContact: (contact: IContact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
};

const ContactManager = ({ contacts, editContact, deleteContact }: Props) => {
  return (
    <Container className="text-center">
      {contacts.length === 0 && <p>No contacts found</p>}
      <Row>
        {contacts.length > 0 &&
          contacts.map((contact) => {
            return (
              <Col key={contact.id}>
                <ContactCard
                  contact={contact}
                  editContact={editContact}
                  deleteContact={deleteContact}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default ContactManager;
