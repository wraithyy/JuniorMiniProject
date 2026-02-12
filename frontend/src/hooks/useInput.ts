import { useState } from "react";
import type { ZodType } from "zod";
import type { Contact } from "../types/contact";
import type { UseInputReturn } from "../types/input";

function findDefaultValue(
  prefilledInputs: Contact | undefined,
  inputType: keyof Contact
) {
  return prefilledInputs?.[inputType]?.toString() ?? "";
}

export function useInput(
  prefilledInputs: Contact | undefined,
  inputType: keyof Contact,
  schema: ZodType
): UseInputReturn {
  const defaultValue = findDefaultValue(prefilledInputs, inputType);
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const parsed = schema.safeParse(enteredValue);
  const valueIsValid = parsed.success;
  const errorMsg = valueIsValid
    ? ""
    : (parsed.error.issues[0]?.message ?? "Špatný vstup");
  const displayedErrorMessage = didEdit && !valueIsValid ? errorMsg : "";

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function setAsTouched() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    setAsTouched,
    errorMsg: displayedErrorMessage,
    isValid: valueIsValid,
  };
}
