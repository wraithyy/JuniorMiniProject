import { useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import "./ContactForm.scss";
import { contactsApi } from '../api/contactsApi';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, '_id' | 'create_date'>) => void;
  initialData: Contact;
}

type ContactFormErrors = Partial<
  Record<keyof Omit<Contact, '_id' | 'create_date'>, string>
>;

export const ContactForm: FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  const [data, setData] = useState<Contact>({ ...initialData });
  const [errors, setErrors] = useState<ContactFormErrors>({});

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

  function validateField (name: keyof ContactFormErrors, value: unknown): string | undefined {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!String(value).trim()) return 'Povinné pole';
        break;

      case 'email':
        if (!String(value).trim()) return 'Povinné pole';
        if (!/^\S+@\S+\.\S+$/.test(String(value)))
          return 'Neplatný email';
        break;

      case 'zipCode':
        if (value == null) return 'Povinné pole';
        if (String(value).length < 5)
          return 'ZIP musí mít alespoň 5 číslic';
        break;
    }
  };

  function validateForm(): boolean {
    const newErrors: ContactFormErrors = {};

    (Object.keys(data) as Array<keyof ContactFormErrors>).forEach(
      (key) => {
        const error = validateField(key, data[key]);
        if (error) newErrors[key] = error;
      }
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await contactsApi.createContact(data);
      
      onSubmit(response);
    }
    catch {

    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;

    const fieldName = name as keyof ContactFormErrors;
    const error = validateField(fieldName, data[fieldName]);

    setErrors(prev => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  return data ? (
    <div>
      <h2>{data ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Základní údaje</h3>

        <div className="form-row">
          <div className="field-group">
            <label htmlFor="firstName">Jméno</label>
            <input type="text" id="firstName" required name="firstName"
              value={data.firstName} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="lastName">Příjmení</label>
            <input type="text" id="lastName" required name="lastName" 
              value={data.lastName} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" required name="email" 
              value={data.email} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="phone">Telefonní číslo</label>
            <input type="text" id="phone" name="phone" 
              value={data.phone} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>
        
        <div className="field-group grow radio-group">
          <p>Pohlaví</p>
          <label htmlFor="male">Muž</label>
          <input type="radio" name="gender" id="male" 
            value={data.gender} onChange={handleChange} onBlur={handleBlur}
          />
          <label htmlFor="male">Žena</label>
          <input type="radio" name="gender" id="female" 
            value={data.gender} onChange={handleChange} onBlur={handleBlur}
          />
          <label htmlFor="male">Jiné</label>
          <input type="radio" name="gender" id="other" 
            value={data.gender} onChange={handleChange} onBlur={handleBlur}
          />
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div className="field-group">
          <label htmlFor="note">Poznámka</label>
          <textarea name="note" id="note"
            value={data.note} onChange={handleChange} onBlur={handleBlur}
          ></textarea>
          {errors.note && <span className="error">{errors.note}</span>}
        </div>

        <hr />
        <h3>Adresa</h3>

        <div className="form-row">
          <div className="field-group">
            <label htmlFor="city">Město</label>
            <input type="text" name="city" id="city" 
              value={data.city} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="street">Ulice</label>
            <input type="text" name="street" id="street" 
              value={data.street} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.street && <span className="error">{errors.street}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="field-group">
            <label htmlFor="houseNumber">Číslo popisné</label>
            <input type="text" name="houseNumber" id="houseNumber"
              value={data.houseNumber} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.houseNumber && <span className="error">{errors.houseNumber}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="zipCode">ZIP</label>
            <input type="number" name="zipCode" id="zipCode" 
              value={data.zipCode} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
          </div>
        </div>
        
        <hr />

        <div className="field-group">
          <label htmlFor="birthDate">Datum narození</label>
          <input type="date" name="birthDate" id="birthDate" 
            value={data.birthDate?.toLocaleString()} onChange={handleChange} onBlur={handleBlur}
          />
          {errors.birthDate && <span className="error">{errors.birthDate}</span>}
        </div>

        <button type="submit" className="submit">
          Vytvořit
        </button>
      </form>
    </div>
  ) : (
    <p>Todo: LOADER</p>
  );
};
