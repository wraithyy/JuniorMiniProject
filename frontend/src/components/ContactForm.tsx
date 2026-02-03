import { useEffect, useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import "./ContactForm.scss";
import { contactsApi } from '../api/contactsApi';
import { formatDate } from '../helpers';

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
  const [submitError, setSubmitError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>();
  const [successMessage, setSuccessMessage] = useState<string | null>();

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
        if (!!value && String(value).length < 5)
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

    setLoading(true);

    try {
      let response;

      if (data._id) {
        response = await contactsApi.updateContact(data._id, data);
        setSuccessMessage("Kontakt byl upraven");
      }
      else {
        response = await contactsApi.createContact(data);
        setSuccessMessage("Kontakt byl vytvořen");
      }

      setSubmitError(null);
      onSubmit(response);

    }
    catch {
      setSubmitError("Nepodařilo se dokončit požadavek");
      setSuccessMessage(null);
    }

    setLoading(false);
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

  useEffect(() => {
    setData({ ...initialData });
  }, [initialData]);

  return data ? (
    <div>
      <h2>{data._id ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>
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
            value={formatDate(data.birthDate)} onChange={handleChange} onBlur={handleBlur}
          />
          {errors.birthDate && <span className="error">{errors.birthDate}</span>}
        </div>

        {submitError && <p className="error">{submitError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit" className="submit">
          {loading 
            ? <span className="loader"></span> 
            : data._id ? 'Upravit kontakt' : 'Vytořit kontakt'
          }
        </button>
      </form>
    </div>
  ) : (
    <p>Todo: LOADER</p>
  );
};
