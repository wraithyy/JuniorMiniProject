import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { contactsApi } from "../api/contactsApi";
import type { Contact } from "../types/contact";
import { formatDate } from "../utils/formatters";
import { formSchema } from "../utils/zodSchema";
import FormInputController from "./controllers/FormInputController";
import FormRadioGroup from "./inputs/FormRadioGroup";
import FormTextArea from "./inputs/FormTextArea";

type FormFields = z.infer<typeof formSchema>;

interface ContactformProps {
  onSubmit: (contact: Contact) => void;
  initialData: Contact | null;
}

export default function ContactForm({
  onSubmit,
  initialData,
}: ContactformProps) {
  const defaultValues = {
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    email: initialData?.email ?? "",
    birthDate: initialData?.birthDate ? formatDate(initialData.birthDate) : "",
    gender: initialData?.gender ?? "",
    phone: initialData?.phone ?? "",
    city: initialData?.city ?? "",
    street: initialData?.street ?? "",
    houseNumber: initialData?.houseNumber ?? "",
    zipCode: initialData?.zipCode ? String(initialData.zipCode) : "",
    note: initialData?.note ?? "",
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues,
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  async function handleFormSubmit(data: FormFields) {
    try {
      const savedContact = initialData?._id
        ? await contactsApi.updateContact(initialData._id, data)
        : await contactsApi.createContact(data);
      savedContact && onSubmit(savedContact);
    } catch {
      console.log("catch");
      setError("root", { message: "Nepodařilo se odeslat data." });
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

      <FormInputController
        control={control}
        label="Jméno"
        name="firstName"
        required
      />

      <FormInputController
        control={control}
        label="Příjmení"
        name="lastName"
        required
      />

      <FormInputController
        control={control}
        label="E-mail"
        name="email"
        required
        type="email"
      />

      <FormInputController
        control={control}
        label="Datum narození"
        max={formatDate(new Date().toISOString())}
        name="birthDate"
        type="date"
      />

      <Controller
        control={control}
        name="gender"
        render={({ field, fieldState }) => (
          <FormRadioGroup
            errorMsg={fieldState.error?.message}
            id="gender"
            label="Pohlaví"
            onBlur={field.onBlur}
            onChange={field.onChange}
            options={[
              { label: "muž", value: "male" },
              { label: "žena", value: "female" },
              { label: "jiné", value: "other" },
            ]}
            value={field.value}
          />
        )}
      />

      <FormInputController control={control} label="Telefon" name="phone" />

      <FormInputController control={control} label="Město" name="city" />

      <FormInputController control={control} label="Ulice" name="street" />

      <FormInputController
        control={control}
        label="Číslo popisné"
        name="houseNumber"
      />

      <FormInputController control={control} label="PSČ" name="zipCode" />

      <Controller
        control={control}
        name="note"
        render={({ field, fieldState }) => (
          <FormTextArea
            errorMsg={fieldState.error?.message}
            id="note"
            label="Poznámka"
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value ?? ""}
          />
        )}
      />

      <button className="submit-btn" disabled={isSubmitting} type="submit">
        {submitBtnText()}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  );
}
