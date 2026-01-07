import './styles/main.css';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css'; // phone library plugin CSS


const input = document.querySelector<HTMLInputElement>('#phone');
if (input) {
  const iti = intlTelInput(input, {
    initialCountry: 'cz',
    // customize options as needed
  });
  // Optionally access iti methods
  // console.log(iti.getNumber());
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

