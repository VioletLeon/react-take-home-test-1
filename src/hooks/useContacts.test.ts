import useContacts from './useContacts';
import { renderHook, act } from '@testing-library/react';

describe('useContacts hook', () => {
  it('should fetch contacts', async () => {
    const { result } = renderHook(() => useContacts());
    expect(result.current.contacts).toEqual([]);
  });

  it('should add a contact and update the state', async () => {
    const { result } = renderHook(() => useContacts());
    const newContact = {
      name: 'New Contact',
      phone: '111-111-1111',
      email: 'new@example.com',
      age: 40,
    };
    const expectedContact = { ...newContact, id: expect.any(String) };

    await act(async () => {
      await result.current.addContact(expectedContact);
    });
    expect(result.current.contacts).toContainEqual(expectedContact);
  });

  it('should edit a contact and update the state', async () => {
    const { result } = renderHook(() => useContacts());

    const existingContact = {
      name: 'Existing Contact', // Make sure this name is unique
      phone: '222-222-2222',
      email: 'existing@example.com',
      age: 50,
    };
    const expectedContact = { ...existingContact, id: expect.any(String) };
    await act(async () => {
      await result.current.addContact(expectedContact);
    });

    const editedContact = { ...expectedContact, name: 'Edited Contact' };
    await act(async () => {
      await result.current.editContact(editedContact);
    });
    expect(result.current.contacts).toContainEqual(editedContact);
  });

  it('should delete a contact and update the state', async () => {
    const { result } = renderHook(() => useContacts());
    const existingContact = {
      name: 'Existing Contact', // Make sure this name is unique
      phone: '222-222-2222',
      email: 'existing@example.com',
      age: 50,
    };

    const expectedContact = { ...existingContact, id: expect.any(String) };
    await act(async () => {
      await result.current.addContact(expectedContact);
    });
    expect(result.current.contacts).toContainEqual(expectedContact);

    await act(async () => {
      await result.current.deleteContact(expectedContact.id);
    });
    expect(result.current.contacts).not.toContainEqual(expectedContact);
  });
});
