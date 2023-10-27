import useContacts from './useContacts';
import { renderHook } from '@testing-library/react';

describe('useContacts hook', () => {
  it('should fetch contacts', async () => {
    const { result } = renderHook(() => useContacts());
    expect(result.current.contacts).toEqual([]);
  });
});
