import type { FC } from 'react';
import type { Contact } from '../types/contact';

interface ContactListProps {
  onContactSelect?: (contact: Contact) => void;
}

export const ContactList: FC<ContactListProps> = ({ onContactSelect }) => {
  // TODO: Implementovat seznam kontaktů:
  //
  // 1. Načíst všechny kontakty pomocí contactsApi.getAllContacts()
  //    - použít useEffect pro načtení při mount komponenty
  //    - použít useState pro uložení kontaktů
  //
  // 2. Zobrazit seznam jmen kontaktů
  //    - Zobrazit firstName a lastName
  //    - Při kliknutí na jméno zavolat onContactSelect
  //
  // 3. Tlačítko "Smazat" u každého kontaktu
  //    - Při kliknutí zavolat contactsApi.deleteContact(id)
  //    - Po smazání znovu načíst seznam
  //
  // 4. Styling pomocí CSS/SCSS
  //
  // 5. Error handling:
  //    - Loading stav během načítání
  //    - Zobrazení chybové hlášky při selhání
  //
  // Použití API klientu:
  // import { contactsApi } from '../api/contactsApi'

  return (
    <div>
      <h2>Seznam kontaktů</h2>
      <p>TODO: Implementovat seznam</p>
    </div>
  );
};
