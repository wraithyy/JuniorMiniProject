import { useMemo, type FC } from 'react';
import type { Contact } from '../types/contact';
import Button from '@mui/material/Button';

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
        <p>Vyberte kontakt ze seznamu pro zobrazení detailu</p>
      </div>
    );

  return (
    <div>
      <h2>Detail kontaktu</h2>
      <p>Vybraný kontakt: <b>{contact.firstName} {contact.lastName}</b></p>
      <p>Email: <b>{contact.email ?? '-'}</b></p>
      <p>Telefon: <b>{contact.phone ?? '-'}</b></p>
      <p>Pohlaví: <b>{contact.gender ?? '-'}</b></p>
      <p>Poznámka: <b>{contact.note ?? '-'}</b></p>
      <p>Adresa: <b>{contact.city} {contact.street} {contact.houseNumber} {contact.zipCode}</b></p>
      <p>Datum narození: <b>{dateOfBirth ?? '-'}</b></p>
      <br />

      <Button variant="contained" onClick={() => onEdit?.()}>Upravit</Button>
    </div>
  );
};
