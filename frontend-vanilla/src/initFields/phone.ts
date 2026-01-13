import { getErrorElement, debounce } from '../helpers';
import { FieldAdapter } from './types';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css'; // phone library plugin CSS

export default function initPhone(): FieldAdapter {
  // Get the phone input element
  const input = document.querySelector<HTMLInputElement>('#phone');
  
if (!input) {
    // Return a safe adapter (non-null) to avoid null checks downstream
    console.warn('Phone input (#phone) not found.');
    return {
      isValid: () => false,
      getValue: () => "",
    };
  }

  // Find the error message element for this input
  const errorMsg = getErrorElement(input);

  // Initialize intl-tel-input for phone validation
  const iti = intlTelInput(input, {
    initialCountry: 'cz',
    loadUtils: () => import('intl-tel-input/utils'),
  });

  let errorShown = false; // Track if an error is currently displayed

  // Update error message based on validity
  const updateError = () => {
    const isValid = iti.isValidNumber();
    if (errorMsg) {
      errorMsg.textContent = isValid ? '' : 'Please enter a valid phone number';
    }
    errorShown = !isValid;
  };


  const onInput = debounce(() => {
    if (errorShown) updateError();
  });

  iti.promise.then(() => {
    input.addEventListener('blur', updateError);
    input.addEventListener('countrychange', updateError);
    input.addEventListener('input', onInput);
  });


 
 const isValid = () => (iti.isValidNumber() ?? false);
  const getValue = () => {
    const num = iti.getNumber();          // returns "" when empty/invalid
    const valid = iti.isValidNumber() ?? false;
    return num && valid ? num : "";     // normalize to empty string when invalid/empty
  };

  return { isValid, getValue };


}