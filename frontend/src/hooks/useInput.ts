import { useEffect, useState } from "react";
import type { ZodType } from "zod";
import type { Contact } from "../types/contact";
import type { UseInputReturn } from "../types/input";
import { inputFormatters } from "../utils/inputFormatters";

type InputElement = HTMLInputElement | HTMLTextAreaElement;

function findDefaultValue(
  prefilledInputs: Contact | null,
  inputType: keyof Contact
) {
  const prefilledInput =  prefilledInputs?.[inputType]?.toString() ?? "";
  if (inputType in inputFormatters) {
    const key = inputType as keyof typeof inputFormatters;
    return inputFormatters[key](prefilledInput);
  }
  return prefilledInput;
}

export function useInput(
  prefilledInputs: Contact | null,
  inputType: keyof Contact,
  schema: ZodType
): UseInputReturn {
  const defaultValue = findDefaultValue(prefilledInputs, inputType);
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  useEffect(() => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  }, [defaultValue]);

  const parsed = schema.safeParse(enteredValue);
  const valueIsValid = parsed.success;
  const errorMsg = valueIsValid
    ? ""
    : (parsed.error.issues[0]?.message ?? "Špatný vstup");
  const displayedErrorMessage = didEdit && !valueIsValid ? errorMsg : "";

  function handleInputChange(event: React.ChangeEvent<InputElement>) {
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
