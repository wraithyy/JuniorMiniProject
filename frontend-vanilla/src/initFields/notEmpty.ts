
import { z } from 'zod';
import { getErrorElement, debounce } from '../helpers';

// Only require non-empty after trimming
const nonEmptyNameSchema = z
  .string()
  .trim()
  .min(1, 'This field is required');

export function initNotEmptyField(root: ParentNode, selector: string) {
  const input = root.querySelector<HTMLInputElement>(selector);
 if (!input) {
        console.warn('Email input (#email) not found.');
        return () => "";
    }
  input.required = true;
    
  // Resolve the element where error messages should be displayed using imported helper
  const errorMsg = getErrorElement(input);
  let errorShown = false;

  const validate = (value: string) => {
    const result = nonEmptyNameSchema.safeParse(value);
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? 'This field is required';
      if (errorMsg) errorMsg.textContent = msg;
      errorShown = true;
      return false;
    }
    if (errorMsg) errorMsg.textContent = '';
    errorShown = false;
    return true;
  };

  const updateError = () => validate(input.value);

  const onInput = debounce(() => {
    if (errorShown) updateError();
  });

  input.addEventListener('blur', updateError);
  input.addEventListener('input', onInput);

  return () => input.value;
}

// Convenience wrappers
export function initFirstName(root: ParentNode) {
  return initNotEmptyField(root, '#firstName');
}
export function initLastName(root: ParentNode) {
  return initNotEmptyField(root, '#lastName');
}
