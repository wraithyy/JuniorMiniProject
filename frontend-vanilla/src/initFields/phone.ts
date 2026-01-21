import { getErrorElement, debounce } from '../helpers';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css'; // phone library plugin CSS

export default function initPhone() {
  // Get the phone input element
  const input = document.querySelector<HTMLInputElement>('#phone');

  if (!input) {
    console.warn('Phone input (#phone) not found.');
    return () => "";
    
  }

  // Find the error message element for this input
  const errorMsg = getErrorElement(input);

  // Initialize intl-tel-input for phone validation
  const iti = intlTelInput(input, {
    initialCountry: 'cz',
    loadUtils: () => import('intl-tel-input/utils'),
  });

  let errorShown = false; // Track if an error is currently displayed
  const isEmpty = () => input.value.trim() === ''; 
  // Update error message based on validity
  const updateError = () => {
    const isValid = iti.isValidNumber() || isEmpty();
    if (errorMsg) {
      const msg = isValid ? '' : 'Phone number format is invalid (either correct it or remove it)';
      errorMsg.textContent = msg;
      input.setCustomValidity(msg);
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



  
  return () => iti.getNumber();          // returns "" when empty/invalid

  



}