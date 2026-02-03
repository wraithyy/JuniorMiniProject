import { useEffect, useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import { contactsApi } from '../api/contactsApi';
import "./ContactList.scss";

interface ContactListProps {
  onContactSelect?: (contact: Contact) => void;
}

export const ContactList: FC<ContactListProps> = ({ onContactSelect }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  // 3. Tlačítko "Smazat" u každého kontaktu
  //    - Při kliknutí zavolat contactsApi.deleteContact(id)
  //    - Po smazání znovu načíst seznam
  //
  // Použití API klientu:
  // import { contactsApi } from '../api/contactsApi'

  function handleClick(contact: Contact) {
    if (!onContactSelect) return;

    onContactSelect(contact);
  }

  async function handleDelete(contact: Contact) {
    if (!contact._id) return;

    try {
      await contactsApi.deleteContact(contact._id);
    }
    catch {
      setError("Nepodařilo se odstranit kontakt")
    }
  }

  useEffect(() => {
    async function loadContacts() {
      setLoading(true);

      try {
        const response = await contactsApi.getAllContacts();
        setContacts(response);
      }
      catch {
        setError("Nepodařilo se načíst kontakty");
      }
      
      setLoading(false);
    }

    loadContacts();
  }, []);

  return loading ? (
    <p>TODO LOADER</p>
  ) : (
    <>
      {error && <p>{error}</p>}
      <div>
        <h2>Seznam kontaktů</h2>
        {contacts.map(contact => (
          <div
            className="contact"
            key={contact._id}
            onClick={() => handleClick(contact)}
          >
            <p>{contact.firstName} {contact.lastName}</p>
          </div>
        ))}
      </div>
    </>
  );
};
