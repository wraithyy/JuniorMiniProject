import type { FC } from "react";
import { useCreateContact } from "../hooks/fetching/useCreateContact";
import { useUpdateContact } from "../hooks/fetching/useUpdateContact";
import { useContactFormInputs } from "../hooks/useContactFormInputs";
import type { Contact } from "../types/contact";
import type { UseInputReturn } from "../types/input";
import FormInput from "./inputs/FormInput";
import FormRadioGroup from "./inputs/FormRadioGroup";
import FormTextArea from "./inputs/FormTextArea";

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
  initialData: Contact | null;
}

export const ContactForm: FC<ContactFormProps> = ({
  onSubmit,
  initialData,
}) => {
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
  const contactInputProps = useContactFormInputs(initialData);
  const { firstNameProps, lastNameProps, emailProps, noteProps, genderProps } =
    contactInputProps;

  const updating = initialData?._id;

  const create = useCreateContact();
  const update = useUpdateContact();

  const { error, isFetching } = updating ? update : create;

  function allInputsValid(inputProps: Record<string, UseInputReturn>): boolean {
    return Object.values(inputProps).every(({ isValid }) => isValid);
  }

  function triggerErrors(inputProps: Record<string, UseInputReturn>): void {
    for (const inputProp of Object.values(inputProps)) {
      inputProp.setAsTouched();
    }
  }

  async function fetchContact(formContact: Contact) {
    if (initialData?._id) {
      return await update.updateContact(initialData._id, formContact);
    }
    return await create.createContact(formContact);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (allInputsValid(contactInputProps)) {
      const formContact: Contact = {
        firstName: firstNameProps.value,
        lastName: lastNameProps.value,
        email: emailProps.value,
        note: noteProps.value,
        gender: genderProps.value,
      };

      const fetchedContact = await fetchContact(formContact);

      if (fetchedContact) {
        onSubmit(fetchedContact);
      }
    } else {
      triggerErrors(contactInputProps);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Editace kontaktu" : "Nový kontakt"}</h2>

      <FormInput
        formprops={firstNameProps}
        id="firstName"
        label="Jméno"
        name="firstName"
        required
        type="text"
      />

      <FormInput
        formprops={lastNameProps}
        id="lastName"
        label="Příjmení"
        name="lastName"
        required
        type="text"
      />

      <FormInput
        formprops={emailProps}
        id="email"
        label="E-mail"
        name="email"
        required
        type="email"
      />

      <FormTextArea formprops={noteProps} id="note" label="Note" name="note" />

      <FormRadioGroup
        formProps={genderProps}
        label="gender"
        name="gender"
        options={[
          { label: "muž", value: "male" },
          { label: "žena", value: "female" },
        ]}
      />

      <button className="submit-btn" type="submit">
        {initialData ? "Potvrdit změny" : "Přidat kontakt"}
      </button>
      {error && <p className="state-error">{error}</p>}
      {isFetching && <p>Odesílám data</p>}
    </form>
  );
};
