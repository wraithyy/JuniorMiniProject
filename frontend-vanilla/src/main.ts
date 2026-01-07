import './styles/main.css';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css'; // phone library plugin CSS



document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector<HTMLInputElement>('#phone');
  if (!input) return;

  const errorMsg = getErrorElement(input);
  const iti = intlTelInput(input, {
    initialCountry: 'cz',
    loadUtils: () => import('intl-tel-input/utils'),
  });

  let errorShown = false;

  const updateError = () => {
    const isValid = iti.isValidNumber();
    if (errorMsg) {
      errorMsg.textContent = isValid ? '' : 'Please enter a valid phone number';
    }
    errorShown = !isValid;
  };

  iti.promise.then(() => {
    input.addEventListener('blur', updateError);
    input.addEventListener('countrychange', updateError);
    input.addEventListener('input', debounce(() => {if (errorShown) updateError();}));
  });
});

// Helpers

// reusable function that returns an error element of general input field
function getErrorElement(input: HTMLInputElement): HTMLElement | null {
  const next = input.nextElementSibling;
  if (next instanceof HTMLElement && next.classList.contains('error')) {
    return next;
  }

  const field = input.closest('.field');
  const el = field?.querySelector('.error') ?? null;
  return el instanceof HTMLElement ? el : null;
}

// 
function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: number | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}




// TODO: Implementovat aplikaci pro správu kontaktů
//
// 1. Vytvořit formulář pro vytvoření kontaktu
// 2. Vytvořit seznam kontaktů
// 3. Implementovat zobrazení detailu kontaktu
// 4. Přidat možnost smazat kontakt
//
// API endpointy jsou dostupné na: http://localhost:3333/api/contacts
// Dokumentace API: http://localhost:3333/swagger

console.log('Vanilla TypeScript frontend připraven k implementaci!');


const app = document.getElementById('app');

if (app) {

}

