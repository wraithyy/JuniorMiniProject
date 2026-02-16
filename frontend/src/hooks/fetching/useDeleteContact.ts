import { useState } from "react";
import { contactsApi } from "../../api/contactsApi";

interface UseDeleteContactResult {
  deleteContact: (id: string) => Promise<void>;
  error: string | null;
  isFetching: boolean;
}

export function useDeleteContact(): UseDeleteContactResult {
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const deleteContact = async (
    id: string,
  ): Promise<void> => {
    try {
      setIsFetching(true);
      setError(null);
      const data = await contactsApi.deleteContact(id);
      return data;
    } catch {
      setError("Nepodařilo se smazat kontakt.");
    } finally {
      setIsFetching(false);
    }
  };

  return { deleteContact, error, isFetching };
}
