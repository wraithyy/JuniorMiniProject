import { useEffect, useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import { contactsApi } from '../api/contactsApi';
import './ContactList.scss';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, CircularProgress, Typography, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

interface ContactListProps {
  selectedContact: Contact | null,
  onContactSelect?: (contact: Contact | null) => void;
}

export const ContactList: FC<ContactListProps> = ({ onContactSelect, selectedContact }) => {
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

      if (selectedContact?._id === contact._id)
        onContactSelect?.(null);
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
    return (<CircularProgress />)

  return (
    <>
      {error && <p>{error}</p>}
      <div>
        <Typography variant="h2">Seznam kontaktů</Typography>
        <List>
          {contacts.map(contact => (
            <ListItemButton selected={selectedContact === contact} key={contact._id} onClick={() => handleClick(contact)}>
              <ListItemText>
                {contact.firstName} {contact.lastName}
              </ListItemText>
              <ListItemIcon>
                <IconButton onClick={() => handleDelete(contact)} color="error">
                  <CloseIcon />
                </IconButton>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </div>
    </>
  );
};
