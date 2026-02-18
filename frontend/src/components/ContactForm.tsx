import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { contactsApi } from "../api/contactsApi";
import type { Contact } from "../types/contact";
import { formatDate } from "../utils/formatters";
import { formSchema } from "../utils/zodSchema";
import FormInput from "./inputs/FormInput";
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

      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="firstName"
            label="Jméno"
            onBlur={field.onBlur}
            onChange={field.onChange}
            required
            type="text"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="lastName"
            label="Příjmení"
            onBlur={field.onBlur}
            onChange={field.onChange}
            required
            type="text"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="email"
            label="Email"
            onBlur={field.onBlur}
            onChange={field.onChange}
            required
            type="email"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="birthDate"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="birthDate"
            label="Datum narození"
            max={formatDate(new Date().toISOString())}
            onBlur={field.onBlur}
            onChange={field.onChange}
            type="date"
            value={field.value ?? ""}
          />
        )}
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

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="phone"
            label="Telefon"
            onBlur={field.onBlur}
            onChange={field.onChange}
            type="text"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="city"
            label="Město"
            onBlur={field.onBlur}
            onChange={field.onChange}
            type="text"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="street"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="street"
            label="Ulice"
            onBlur={field.onBlur}
            onChange={field.onChange}
            type="text"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="houseNumber"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="houseNumber"
            label="Číslo popisné"
            onBlur={field.onBlur}
            onChange={field.onChange}
            type="text"
            value={field.value ?? ""}
          />
        )}
      />

      <Controller
        control={control}
        name="zipCode"
        render={({ field, fieldState }) => (
          <FormInput
            errorMsg={fieldState.error?.message}
            id="zipCode"
            label="PSČ"
            onBlur={field.onBlur}
            onChange={field.onChange}
            type="number"
            value={field.value ?? ""}
          />
        )}
      />

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
