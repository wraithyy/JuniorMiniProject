import { useMemo, type FC } from 'react';
import type { Contact } from '../types/contact';

interface ContactDetailProps {
  contact: Contact | null;
  onEdit?: () => void,
}

export const ContactDetail: FC<ContactDetailProps> = ({ contact, onEdit }) => {
  // TODO: Implementovat detail kontaktu:
  //
  // 1. Zobrazit všechny informace o kontaktu
  //    - Jméno a příjmení
  //    - Email
  //    - Pohlaví
  //    - Telefon
  //    - Poznámka
  //    - Adresa (město, ulice, číslo popisné, PSČ)
  //    - Datum narození
  //
  // 2. Styling pomocí CSS/SCSS
  //
  // 3. Pokud contact je null, zobrazit výzvu k výběru kontaktu
  //
  // Bonusový úkol:
  // - Tlačítko "Editovat" které otevře formulář s předvyplněnými daty

  function handleEdit() {
    if (!onEdit) return;

    onEdit();
  }

  const bod = useMemo(() => {
    if (!contact?.birthDate) return null;
    if (typeof contact?.birthDate === "string")
      return contact.birthDate;

    return contact?.birthDate?.toLocaleDateString();
  }, [contact?.birthDate]);

  if (!contact) {
    return (
      <div>
        <p>Vyberte kontakt ze seznamu pro zobrazení detailu</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Detail kontaktu</h2>
      <p>Vybraný kontakt: {contact.firstName} {contact.lastName}</p>
      <p>Email: {contact.email ?? '-'}</p>
      <p>Telefon: {contact.phone ?? '-'}</p>
      <p>Pohlaví: {contact.gender ?? '-'}</p>
      <p>Poznámka: {contact.note ?? '-'}</p>
      <p>Adresa: {contact.city} {contact.street} {contact.houseNumber} {contact.zipCode}</p>
      <p>Datum narození: {bod ?? '-'}</p>

      <button onClick={handleEdit}>Upravit</button>
    </div>
  );
};
