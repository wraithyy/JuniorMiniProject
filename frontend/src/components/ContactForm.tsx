import { useCreateContact } from "../hooks/fetching/useCreateContact";
import { useUpdateContact } from "../hooks/fetching/useUpdateContact";
import type { Contact } from "../types/contact";
import type { UseInputReturn } from "../types/input";
import { formSchema } from "../utils/validators";
import FormInput from "./inputs/FormInput";
import FormRadioGroup from "./inputs/FormRadioGroup";
import FormTextArea from "./inputs/FormTextArea";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm<FormFields>();

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

  function onSubmit(data: FormFields) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{initialData ? "Editace kontaktu" : "Nový kontakt"}</h2>
      <input
        {...register("firstName")}
        className="form-control"
        placeholder="First Name"
        type="text"
      />
      <input
        {...register("lastName")}
        className="form-control"
        placeholder="Last Name"
        type="text"
      />
      <input
        {...register("email")}
        className="form-control"
        placeholder="Email"
        type="text"
      />
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
