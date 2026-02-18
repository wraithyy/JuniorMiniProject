import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import type { Contact } from "../types/contact";
import { formSchema } from "../utils/zodSchema";
import FormInput from "./inputs/FormInput";

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

  // async function handleFormSubmit(data: FormFields) {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     throw new Error("gh");
  //   } catch {
  //     setError("root", { message: "server issue" });
  //   }
  // }

   function handleFormSubmit(data: FormFields) {
    console.log(data);
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
    <form onSubmit={handleSubmit(handleFormSubmit) }>
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

      <button className="submit-btn" disabled={isSubmitting} type="submit">
        {submitBtnText()}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  );
}
