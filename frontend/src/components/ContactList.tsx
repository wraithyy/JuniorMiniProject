import type { FC } from 'react';
import type { Contact } from '../types/contact';
import { contactsApi } from '../api/contactsApi';
import './ContactList.scss';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton,
  CircularProgress,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../queryClient';

interface ContactListProps {
  selectedContact: Contact | null;
  onContactSelect?: (contact: Contact | null) => void;
}

export const ContactList: FC<ContactListProps> = ({ onContactSelect, selectedContact }) => {
  const {
    data: contacts,
    isLoading,
    error,
  } = useQuery({ queryKey: ['contacts'], queryFn: contactsApi.getAllContacts });

  function handleClick(contact: Contact) {
    if (!onContactSelect) return;

    onContactSelect(contact);
  }

  const deleteContactMutation = useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });

      if (selectedContact?._id === deletedId) {
        onContactSelect?.(null);
      }
    },
  });

  function handleDelete(contact: Contact) {
    if (!contact._id) return;
    deleteContactMutation.mutate(contact._id);
  }

  if (isLoading || !contacts) return <CircularProgress />;

  if (error)
    return (
      <Typography variant="subtitle1" color="error">
        Nepodařilo se načíst list
      </Typography>
    );

  return (
    <div>
      <Typography variant="h2">Seznam kontaktů</Typography>
      <List>
        {contacts.map((contact) => (
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
  );
};
