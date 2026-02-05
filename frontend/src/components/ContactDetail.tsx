import { useMemo, type FC } from 'react';
import type { Contact } from '../types/contact';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface ContactDetailProps {
  contact: Contact | null;
  onEdit?: () => void,
}

export const ContactDetail: FC<ContactDetailProps> = ({ contact, onEdit }) => {
  const dateOfBirth = useMemo(() => {
    if (!contact?.birthDate) return null;
    if (typeof contact?.birthDate === "string")
      return contact.birthDate;

    return contact?.birthDate?.toLocaleDateString();
  }, [contact?.birthDate]);

  if (!contact)
    return (
      <div>
        <Typography variant="subtitle1">Vyberte kontakt ze seznamu pro zobrazení detailu</Typography>
      </div>
    );

  return (
    <div>
      <Typography variant="h2">Detail kontaktu</Typography>
      <Typography variant="subtitle1">Vybraný kontakt: <b>{contact.firstName} {contact.lastName}</b></Typography>
      <Typography variant="subtitle1">Email: <b>{contact.email ?? '-'}</b></Typography>
      <Typography variant="subtitle1">Telefon: <b>{contact.phone ?? '-'}</b></Typography>
      <Typography variant="subtitle1">Pohlaví: <b>{contact.gender ?? '-'}</b></Typography>
      <Typography variant="subtitle1">Poznámka: <b>{contact.note ?? '-'}</b></Typography>
      <Typography variant="subtitle1">Adresa: <b>{contact.city} {contact.street} {contact.houseNumber} {contact.zipCode}</b></Typography>
      <Typography variant="subtitle1">Datum narození: <b>{dateOfBirth ?? '-'}</b></Typography>
      <br />

      <Button variant="contained" onClick={() => onEdit?.()}>Upravit</Button>
    </div>
  );
};
