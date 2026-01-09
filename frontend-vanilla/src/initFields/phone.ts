import { getErrorElement, debounce } from '../helpers';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css'; // phone library plugin CSS

export default function initPhone() {
  // Get the phone input element
  const input = document.querySelector<HTMLInputElement>('#phone');
  if (!input) return null;

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
  }, 300);

  iti.promise.then(() => {
    input.addEventListener('blur', updateError);
    input.addEventListener('countrychange', updateError);
    input.addEventListener('input', onInput);
  });


  const isValid = () => iti.isValidNumber();
  const getE164 = () => (iti.isValidNumber() ? iti.getNumber() : null);


  return { iti, isValid, getE164 } as {
    isValid: () => boolean;
    getE164: () => string | null;
  };

}