
import { z } from 'zod';
import { getErrorElement, debounce } from '../helpers';

// start digits, optional (sep + digits + optional letter)
// for czech formats like 123, 123/2a, 123/1
const houseNumberRegex = /^(\d+(?:[ /-]\d+[A-Za-z]?)?)?$/;

const houseNumberSchema = z
  .string()
  .trim()
  .regex(houseNumberRegex, 'Use formats like 123, 123/7, 123-7a');

export default function initHouseNumber(root: ParentNode) {
  const input = root.querySelector<HTMLInputElement>('#houseNumber');

  if (!input) {
    console.warn('House number input (#houseNumber) not found.');
    return  () => '';
  }

  const errorEl = getErrorElement(input);
  let errorShown = false;

  const validate = (value: string): boolean => {
    const result = houseNumberSchema.safeParse(value);
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? 'Invalid house number';
      if (errorEl) errorEl.textContent = msg;
      errorShown = true;
      input.setCustomValidity("Invalid house number");
      return false;
    }
    if (errorEl) errorEl.textContent = '';
    errorShown = false;
    input.setCustomValidity("");
    return true;
  };

  const updateError = () => validate(input.value);
  const onInput = debounce(() => { if (errorShown) updateError(); });

  input.addEventListener('blur', updateError);
  input.addEventListener('input', onInput);

  return () => input.value;
}
