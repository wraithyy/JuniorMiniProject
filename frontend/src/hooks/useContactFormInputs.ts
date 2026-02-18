import type { Contact } from "../types/contact";
import { formSchema } from "../utils/validators";
import { useInput } from "./useInput";

type FormKey = keyof typeof formSchema.shape;

export function useContactFormInputs(initialData: Contact | null) {
  function useMakeInput<K extends FormKey>(key: K) {
    return useInput(initialData, key, formSchema.shape[key]);
  }

  const firstNameProps = useMakeInput("firstName");
  const lastNameProps = useMakeInput("lastName");
  const emailProps = useMakeInput("email");
  const noteProps = useMakeInput("note");
  const genderProps = useMakeInput("gender");
  const phoneProps = useMakeInput("phone");
  const cityProps = useMakeInput("city");
  const streetProps = useMakeInput("street");
  const houseNumberProps = useMakeInput("houseNumber");
  const zipCodeProps = useMakeInput("zipCode");
  const birthDateProps = useMakeInput("birthDate");

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
