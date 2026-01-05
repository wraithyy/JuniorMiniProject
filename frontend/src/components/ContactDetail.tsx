import type { FC } from 'react';
import type { Contact } from '../types/contact';

interface ContactDetailProps {
  contact: Contact | null;
}

export const ContactDetail: FC<ContactDetailProps> = ({ contact }) => {
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
      <p>TODO: Implementovat zobrazení detailu</p>
      <p>Vybraný kontakt: {contact.firstName} {contact.lastName}</p>
    </div>
  );
};
