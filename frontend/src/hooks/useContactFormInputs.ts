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
  const genderProps = useInput(initialData, "gender", formSchema.shape.text);
  const phoneProps = useInput(initialData, "phone", formSchema.shape.text);
  const cityProps = useInput(initialData, "city", formSchema.shape.text);
  const streetProps = useInput(initialData, "street", formSchema.shape.text);
  const houseNumberProps = useInput(initialData, "houseNumber", formSchema.shape.text);
  const zipCodeProps = useInput(initialData, "zipCode", formSchema.shape.text);
  const birthDateProps = useInput(initialData, "birthDate", formSchema.shape.text);
  

  return {
    emailProps,
    firstNameProps,
    lastNameProps,
    noteProps,
    genderProps,
    phoneProps,
    cityProps,
    streetProps,
    houseNumberProps,
    zipCodeProps,
    birthDateProps,
  };
}
