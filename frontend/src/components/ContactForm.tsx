import { useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import "./ContactForm.scss";
import { contactsApi } from '../api/contactsApi';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, '_id' | 'create_date'>) => void;
  initialData: Contact;
}

export const ContactForm: FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  const [data, setData] = useState<Contact>({ ...initialData });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO validace

    try {
      const response = await contactsApi.createContact(data);
      
      onSubmit(response);
    }
    catch {

    }
  }

  return data ? (
    <div>
      <h2>{data ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="firstName">Jméno</label>
          <input type="text" id="firstName" required name="firstName"
            value={data.firstName} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="lastName">Příjmení</label>
          <input type="text" id="lastName" required name="lastName" 
            value={data.lastName} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" required name="email" 
            value={data.email} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="phone">Telefonní číslo</label>
          <input type="text" id="phone" name="phone" 
            value={data.phone} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="gender">Pohlaví</label>
          <input type="radio" name="gender" id="male" 
            value={data.gender} onChange={handleChange}
          />
          <input type="radio" name="gender" id="female" 
            value={data.gender} onChange={handleChange}
          />
          <input type="radio" name="gender" id="other" 
            value={data.gender} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="note">Poznámka</label>
          <textarea name="note" id="note"
            value={data.note} onChange={handleChange}
          ></textarea>
        </div>

        <hr />
        <h3>Adresa</h3>
        <div className="field-group">
          <label htmlFor="city">Město</label>
          <input type="text" name="city" id="city" 
            value={data.city} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="street">Ulice</label>
          <input type="text" name="street" id="street" 
            value={data.street} onChange={handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="houseNumber">Číslo popisné</label>
          <input type="text" name="houseNumber" id="houseNumber"
            value={data.houseNumber} onChange={handleChange}
           />
        </div>
        <div className="field-group">
          <label htmlFor="zipCode">ZIP</label>
          <input type="number" name="zipCode" id="zipCode" 
            value={data.zipCode} onChange={handleChange}
          />
        </div>
        
        <hr />
        <div className="field-group">
          <label htmlFor="birthDate">Datum narození</label>
          <input type="date" name="birthDate" id="birthDate" 
            value={data.birthDate?.toLocaleString()} onChange={handleChange}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  ) : (
    <p>Todo: LOADER</p>
  );
};
