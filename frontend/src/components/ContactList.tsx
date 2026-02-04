import {useEffect, useState} from 'react';
import type { Contact } from '../types/contact';
import {contactsApi} from "../api/contactsApi.ts";

type ContactListProps = {
  onContactSelect: (contact: Contact) => void;
  selectedContact: Contact | null;
  reload: number;
}

export const ContactList = ({ onContactSelect, reload }: ContactListProps) => {
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

    const [contacts, setContacts] = useState<Contact[]>([])


    useEffect(() => {
        async function load() {
            const result = await contactsApi.getAllContacts();
            setContacts(result);
        }
        load();
    }, [reload]);

    console.log(contacts? contacts : "nope")


    return (
    <div>
      <h2>List of Contacts</h2>

        {contacts.map(contact => (
                <div key={contact._id}>
                    <div className={"contact-name"} onClick={() => onContactSelect(contact)} >
                        {contact.firstName} {contact.lastName}
                    </div>
                </div>
            ))}
    </div>
  );
};
