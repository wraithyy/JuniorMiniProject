import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { contactsApi } from "../../api/contactsApi";
import type { Contact } from "../../types/contact";

interface UseGetAllContactsResult {
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  error: string | null;
  isFetching: boolean;
}

export function useGetAllContacts(): UseGetAllContactsResult {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    let isActive = true;

    const loadContacts = async () => {
      try {
        setIsFetching(true);
        const data = await contactsApi.getAllContacts();
        if (isActive) {
          setContacts(data);
        }
      } catch {
        if (isActive) {
          setError("Nepodařilo se načíst data.");
        }
      } finally {
        if (isActive) {
          setIsFetching(false);
        }
      }
    };

    loadContacts();

    return () => {
      isActive = false;
    };
  }, []);

  return { contacts, setContacts, error, isFetching };
}
