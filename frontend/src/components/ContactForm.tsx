import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContact } from "../hooks/fetching/useCreateContact";
import { useUpdateContact } from "../hooks/fetching/useUpdateContact";
import type { Contact } from "../types/contact";
import type { UseInputReturn } from "../types/input";
import { formSchema } from "../utils/zodSchema";
import FormInput from "./inputs/FormInput";
import FormRadioGroup from "./inputs/FormRadioGroup";
import FormTextArea from "./inputs/FormTextArea";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof formSchema>;

interface ContactformProps {
  onSubmit: (contact: Contact) => void;
  initialData: Contact | null;
}

export default function ContactForm({
  onSubmit,
  initialData,
}: ContactformProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: initialData ?? {},
    resolver: zodResolver(formSchema),
  });

  async function saveContact(formContact: Contact) {
    if (initialData?._id) {
      return await update.updateContact(initialData._id, formContact);
    }
    return await create.createContact(formContact);
  }

  async function handleFormSubmit(data: FormFields) {
    try{
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('gh');
    } catch{
      setError("root", {message: 'server issue',})
    }
  }

  function submitBtnText() {
    if (isSubmitting) {
      return "Odesílám data...";
    }
    if (initialData) {
      return "Potvrdit změny";
    }
    return "Přidat kontakt";
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>{initialData ? "Editace kontaktu" : "Nový kontakt"}</h2>
      <input
        {...register("firstName")}
        className="form-control"
        placeholder="First Name"
        type="text"
      />
      {errors.firstName && (
        <p className="control-error">{errors.firstName.message}</p>
      )}
      <input
        {...register("lastName")}
        className="form-control"
        placeholder="Last Name"
        type="text"
      />
      {errors.lastName && (
        <p className="control-error">{errors.lastName.message}</p>
      )}
      <input
        {...register("email")}
        className="form-control"
        placeholder="Email"
        type="text"
      />
      {errors.email && <p className="control-error">{errors.email.message}</p>}
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

      <button className="submit-btn" disabled={isSubmitting} type="submit">
        {submitBtnText()}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  );
}
