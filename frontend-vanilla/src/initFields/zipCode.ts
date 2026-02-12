import { z } from "zod";
import { debounce, getErrorElement } from "../helpers";

const zipCodeRegex = /^(\d{3}[\s/-]?\d{2})?$/;

const zipCodeSchema = z
  .string()
  .trim()
  .regex(zipCodeRegex, 'Use formats like "407 50" or "40750"');

const normalizeZip = (zipInput: string) => zipInput.replace(/\D+/g, "");

export default function initZip(root: ParentNode) {
  const input = root.querySelector<HTMLInputElement>("#zipCode");

  if (!input) {
    console.warn("Zip code input (#zipCode) not found.");
    return () => "";
  }

  const errorEl = getErrorElement(input);
  let errorShown = false;

  const validate = (value: string): boolean => {
    const result = zipCodeSchema.safeParse(value);
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "Invalid ZIP code";
      if (errorEl) {
        errorEl.textContent = msg;
      }
      errorShown = true;
      input.setCustomValidity("Invalid ZIP code");
      return false;
    }
    if (errorEl) {
      errorEl.textContent = "";
    }
    errorShown = false;
    input.setCustomValidity("");
    return true;
  };

  const updateError = () => validate(input.value);
  const onInput = debounce(() => {
    if (errorShown) {
      updateError();
    }
  });

  input.addEventListener("blur", updateError);
  input.addEventListener("input", onInput);

  return () => normalizeZip(input.value);
}
