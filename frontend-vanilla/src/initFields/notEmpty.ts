
import { z } from 'zod';
import { getErrorElement, debounce } from '../helpers';
import type { FieldAdapter } from './types';

// Only require non-empty after trimming
const nonEmptyNameSchema = z
  .string()
  .trim()
  .min(1, 'This field is required');

export function initNotEmptyField(selector: string): FieldAdapter {
  const input = document.querySelector<HTMLInputElement>(selector);

  if (!input) {
    console.warn(`Name input (${selector}) not found.`);
    return {
      isValid: () => false,
      getValue: () => '',
    };
  }

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

  const isValid = (): boolean => validate(input.value);

  const getValue = (): string => {
    // Return normalized (trimmed) value if valid; otherwise empty string
    const trimmed = input.value.trim();
    return nonEmptyNameSchema.safeParse(trimmed).success ? trimmed : '';
  };

  return { isValid, getValue };
}

// Convenience wrappers
export function initFirstName(): FieldAdapter {
  return initNotEmptyField('#firstName');
}
export function initLastName(): FieldAdapter {
  return initNotEmptyField('#lastName');
}
export function initCity(): FieldAdapter {
  return initNotEmptyField('#city');
}
export function initStreet(): FieldAdapter {
  return initNotEmptyField('#street');
}
