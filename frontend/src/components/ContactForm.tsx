import type { FC } from 'react';
import type { Contact } from '../types/contact';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, '_id' | 'create_date'>) => void;
  initialData?: Contact;
}

export const ContactForm: FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  // TODO: Implementovat formulář s těmito prvky:
  //
  // Povinná pole:
  // - firstName (text input)
  // - lastName (text input)
  // - email (email input)
  //
  // Radio buttons pro pohlaví:
  // - gender (mužské/ženské/jiné)
  //
  // Volitelná pole:
  // - phone (tel input)
  // - note (textarea)
  // - city (text input)
  // - street (text input)
  // - houseNumber (text input)
  // - zipCode (number input)
  // - birthDate (date input) - hezky naformátované
  //
  // Funkcionality:
  // - Validace (povinná pole, validní email)
  // - Zobrazení chybových hlášek
  // - Styling pomocí CSS/SCSS
  //
  // Bonusové úkoly:
  // - Loading indikátor při odesílání
  // - Zobrazení úspěšné/chybové hlášky po odeslání
  //
  // Použití:
  // - Použít připravený contactsApi.createContact() nebo contactsApi.updateContact()
  // - Pro přístup k API klientu: import { contactsApi } from '../api/contactsApi'

  return (
    <div>
      <h2>{initialData ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>
      <p>TODO: Implementovat formulář</p>
    </div>
  );
};
