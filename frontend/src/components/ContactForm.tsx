import { useEffect, useState, type FC } from 'react';
import type { Contact } from '../types/contact';
import "./ContactForm.scss";
import { contactsApi } from '../api/contactsApi';
import { formatDate, mapZodErrors } from '../helpers';
import ContactSchema from '../validation/contact';
import { FieldGroup } from './form/FieldGroup';
import { RadioGroup } from './form/RadioGroup';
import Button from '@mui/material/Button';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, '_id' | 'create_date'>) => void;
  initialData: Contact;
}

type ContactFormErrors = Partial<
  Record<keyof Omit<Contact, '_id' | 'create_date'>, string>
>;

const GENDER_ITEMS = [
  { label: "Muž", value: "on" },
  { label: "Žena", value: "ona" },
  { label: "Ostatní", value: "ono" },
];

export const ContactForm: FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  const [data, setData] = useState<Contact>({ ...initialData });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>();
  const [successMessage, setSuccessMessage] = useState<string | null>();

  function validateField<K extends keyof typeof ContactSchema.shape>( fieldName: K, value: unknown): string | undefined {
    const fieldSchema = ContactSchema.shape[fieldName];
    const result = fieldSchema.safeParse(value);

    if (result.success) return undefined;

    return result.error.issues[0].message;
  }

  function validateForm(): boolean {
    const result = ContactSchema.safeParse(data);
    if (result.success) return true;
   
    const mappedErrors = mapZodErrors(result.error);
    setErrors(mappedErrors);

    return false;
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

  function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  useEffect(() => {
    setData({ ...initialData });
  }, [initialData]);

  if (!data)
    return (<span className="loader"></span>)

  return (
    <div>
      <h2>{data._id ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Základní údaje</h3>

        <div className="form-row">
          <FieldGroup name="firstName" label="Jméno" value={data.firstName}
            error={errors.firstName} onChange={handleChange}
            onBlur={handleBlur} required={true}
          />

          <FieldGroup name="lastName" label="Příjmení" value={data.lastName}
            error={errors.lastName} onChange={handleChange}
            onBlur={handleBlur} required={true}
          />
        </div>

        <div className="form-row">
          <FieldGroup name="email" label="Email" value={data.email}
            error={errors.email} onChange={handleChange}
            onBlur={handleBlur} required={true}
          />
        
          <FieldGroup name="phone" label="Telefonní číslo" value={data.phone}
            error={errors.phone} onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        
        <RadioGroup name="gender" label="Pohlaví" value={data.gender} 
          onChange={handleChange} error={errors.gender}
          items={GENDER_ITEMS}
        />

        <FieldGroup name="note" label="Poznámka" value={data.note}
          error={errors.note} onChange={handleChange}
          onBlur={handleBlur} textarea={true}
        />
        
        <hr />
        <h3>Adresa</h3>

        <div className="form-row">
          <FieldGroup name="city" label="Město" value={data.city}
            error={errors.city} onChange={handleChange}
            onBlur={handleBlur}
          />
          <FieldGroup name="street" label="Ulice" value={data.street}
            error={errors.street} onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        
        <div className="form-row">
          <FieldGroup name="houseNumber" label="Číslo a popisné" value={data.houseNumber}
            error={errors.houseNumber} onChange={handleChange}
            onBlur={handleBlur}
          />
          <FieldGroup name="zipCode" label="ZIP" value={data.zipCode}
            error={errors.zipCode} onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        
        <hr />

        <FieldGroup name="birthDate" label="Datum narození" value={formatDate(data.birthDate)}
          error={errors.birthDate} onChange={handleChange}
          onBlur={handleBlur} type={'date'}
        />

        {submitError && <p className="error">{submitError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <Button type="submit" loading={loading} variant="contained">
            {data._id ? 'Upravit kontakt' : 'Vytořit kontakt'}
        </Button>
      </form>
    </div>
  );
};
