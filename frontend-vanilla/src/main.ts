import './styles/main.css';
import inputs from './inputs'
import handleSubmit from './submit'


// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // const apiEndpoint = 'http://localhost:3333/api/contacts',
  handleSubmit(inputs);
});



// TODO: Implementovat aplikaci pro správu kontaktů
//
// 1. Vytvořit formulář pro vytvoření kontaktu
// 2. Vytvořit seznam kontaktů
// 3. Implementovat zobrazení detailu kontaktu
// 4. Přidat možnost smazat kontakt
//
// API endpointy jsou dostupné na: http://localhost:3333/api/contacts
// Dokumentace API: http://localhost:3333/swagger


const app = document.getElementById('app');

if (app) {

}

