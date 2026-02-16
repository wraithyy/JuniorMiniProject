import type { Contact } from "../types/contact";
import { formSchema } from "../utils/validators";
import { useInput } from "./useInput";

export function useContactFormInputs(initialData: Contact | null) {
  const emailProps = useInput(initialData, "email", formSchema.shape.email);
  const firstNameProps = useInput(
    initialData,
    "firstName",
    formSchema.shape.nonEmpty
  );
  const lastNameProps = useInput(
    initialData,
    "lastName",
    formSchema.shape.nonEmpty
  );

  const noteProps = useInput(initialData, "note", formSchema.shape.text);

  return {
    emailProps,
    firstNameProps,
    lastNameProps,
    noteProps,
  };
}
