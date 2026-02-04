import { useEffect, useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import { contactsApi } from '../api/contactsApi';
import './ContactList.scss';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ContactListProps {
  onContactSelect?: (contact: Contact) => void;
}

export const ContactList: FC<ContactListProps> = ({ onContactSelect }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  function handleClick(contact: Contact) {
    if (!onContactSelect) return;

    onContactSelect(contact);
  }

  async function handleDelete(contact: Contact) {
    if (!contact._id) return;

    try {
      await contactsApi.deleteContact(contact._id);
      await loadContacts();
    }
    catch {
      setError("Nepodařilo se odstranit kontakt")
    }
  }

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

  useEffect(() => {
    loadContacts();
  }, []);

  if (loading)
    return (<span className="loader"></span>)

  return (
    <>
      {error && <p>{error}</p>}
      <div>
        <h2>Seznam kontaktů</h2>
        {contacts.map(contact => (
          <div className="contact-wrapper" key={contact._id}>
             <div
              className="contact"
              onClick={() => handleClick(contact)}
            >
              <p>{contact.firstName} {contact.lastName}</p>
            </div>
            <IconButton onClick={() => handleDelete(contact)}>
              <CloseIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
};
