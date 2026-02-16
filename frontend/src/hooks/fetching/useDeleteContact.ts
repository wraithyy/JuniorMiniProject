import { useState } from "react";
import { contactsApi } from "../../api/contactsApi";

interface UseDeleteContactResult {
  deleteContact: (id: string) => Promise<void>;
  isFetching: boolean;
}

export function useDeleteContact(): UseDeleteContactResult {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const deleteContact = async (id: string): Promise<void> => {
    try {
      setIsFetching(true);
      await contactsApi.deleteContact(id);
    } catch {
      throw new Error("Nepodařilo se smazat kontakt.");
    } finally {
      setIsFetching(false);
    }
  };

  return { deleteContact, isFetching };
}
