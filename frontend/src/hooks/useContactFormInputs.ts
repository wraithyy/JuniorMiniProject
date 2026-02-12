import type { Contact } from "../types/contact";
import { formSchema } from "../utils/validators";
import { useInput } from "./useInput";

export function useContactFormInputs(initialData: Contact | undefined) {
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

  return {
    emailProps,
    firstNameProps,
    lastNameProps,
  };
}
