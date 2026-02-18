import { useCreateContact } from "../hooks/fetching/useCreateContact";
import { useUpdateContact } from "../hooks/fetching/useUpdateContact";
import type { Contact } from "../types/contact";
import type { UseInputReturn } from "../types/input";
import { formSchema } from "../utils/validators";
import FormInput from "./inputs/FormInput";
import FormRadioGroup from "./inputs/FormRadioGroup";
import FormTextArea from "./inputs/FormTextArea";
import {useForm} from 'react-hook-form'

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactformProps {
  onSubmit: (contact: Contact) => void;
  initialData: Contact | null;
}

export default function ContactForm({
  onSubmit,
  initialData,
}: ContactformProps) {
  const {register} = useForm<FormFields>();


  const updating = initialData?._id;

  const create = useCreateContact();
  const update = useUpdateContact();

  const { error, isFetching } = updating ? update : create;

  function triggerErrors(inputProps: Record<string, UseInputReturn>): void {
    for (const inputProp of Object.values(inputProps)) {
      inputProp.setAsTouched();
    }
  }

  async function saveContact(formContact: Contact) {
    if (initialData?._id) {
      return await update.updateContact(initialData._id, formContact);
    }
    return await create.createContact(formContact);
  }

  // async function handleSubmit(
  //   event: React.FormEvent<HTMLFormElement>
  // ): Promise<void> {
  //   event.preventDefault();

  //   const rawContact: Contact = {
  //     firstName: firstNameProps.value,
  //     lastName: lastNameProps.value,
  //     email: emailProps.value,
  //     note: noteProps.value,
  //     gender: genderProps.value,
  //     phone: phoneProps.value,
  //     city: cityProps.value,
  //     street: streetProps.value,
  //     houseNumber: houseNumberProps.value,
  //     zipCode: zipCodeProps.value,
  //     birthDate: birthDateProps.value,
  //   };

  //   const parsed = formSchema.safeParse(rawContact);
  //   if (!parsed.success) {
  //     triggerErrors(contactInputProps);
  //     return;
  //   }

  //   const savedContact = await saveContact(rawContact);
  //   if (savedContact) {
  //     onSubmit(savedContact);
  //   }
  // }

  return (
    <form >
      <h2>{initialData ? "Editace kontaktu" : "Nový kontakt"}</h2>
{/* 
      <FormInput
        formProps={firstNameProps}
        id="firstName"
        label="Jméno"
        name="firstName"
        required
        type="text"
      />

      <FormInput
        formProps={lastNameProps}
        id="lastName"
        label="Příjmení"
        name="lastName"
        required
        type="text"
      />

      <FormInput
        formProps={emailProps}
        id="email"
        label="E-mail"
        name="email"
        required
        type="email"
      /> */}

      <button className="submit-btn" disabled={isFetching} type="submit">
        {initialData ? "Potvrdit změny" : "Přidat kontakt"}
      </button>
      {error && <p className="state-error">{error}</p>}
      {isFetching && <p>Odesílám data</p>}
    </form>
  );
}
