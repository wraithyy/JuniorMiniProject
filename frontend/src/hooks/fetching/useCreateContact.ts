import { useState } from "react";
import { contactsApi } from "../../api/contactsApi";
import type { Contact } from "../../types/contact";

interface UseCreateContactResult {
  createContact: (contactData: Contact) => Promise<Contact | null>;
  error: string | null;
  isFetching: boolean;
}

export function useCreateContact(): UseCreateContactResult {
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const createContact = async (
    contactData: Contact
  ): Promise<Contact | null> => {
    try {
      setIsFetching(true);
      setError(null);
      const data = await contactsApi.createContact(contactData);
      return data;
    } catch {
      setError("Nepodařilo se vytvořit kontakt.");
      return null;
    } finally {
      setIsFetching(false);
    }
  };

  return { createContact, error, isFetching };
}
