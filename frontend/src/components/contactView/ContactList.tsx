import type { Contact, OnContactSelect } from "../../types/contact";
import ContactSelect from "./ContactSelect";

interface ContactListProps {
  onContactSelect: OnContactSelect;
  isFetching: boolean;
  error: string | null;
  contacts: Contact[];
  selectedContact: Contact | null;
}

export default function ContactList ({
  onContactSelect,
  isFetching,
  error,
  contacts,
  selectedContact,
}:ContactListProps)  {
  return (
    <div>
      <h2>Seznam kontaktů</h2>
      {error && <p className="state-error">{error}</p>}
      {isFetching && <p>Načítám data kontaktů.</p>}
      {contacts.length > 0 && (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <ContactSelect
              contact={contact}
              key={contact._id}
              onContactSelect={onContactSelect}
              selectedContact={selectedContact}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

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
