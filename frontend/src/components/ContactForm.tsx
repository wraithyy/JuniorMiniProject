import type { FC } from 'react';
import type { Contact } from '../types/contact';
import FormInput from './FormInput';
import { formSchema } from '../utils/validators';
import { useInput } from '../hooks/useInput';

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

  const emailHook = useInput('', formSchema.shape.email);
  const firstNameHook = useInput('', formSchema.shape.nonEmpty);
  const secondNameHook = useInput('', formSchema.shape.nonEmpty);
  

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? 'Editace kontaktu' : 'Nový kontakt'}</h2>

      <FormInput
        label='Jméno'
        id='firstName'
        name='firstName'
        type='text'
        required
        hook={firstNameHook}
      />

      <FormInput
        label='Příjmení'
        id='lastName'
        name='lastName'
        type='text'
        required
        hook={secondNameHook}
      />

      <FormInput
        label='E-mail'
        id='email'
        name='email'
        type='email'
        required
        hook={emailHook}
      />

      <button className='submit-btn'>
        {initialData ? 'Potvrdit změny' : 'Přidat kontakt'}
      </button>
    </form>
  );
};
