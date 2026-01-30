import './styles/main.css';
import handleSubmit from './submit'
import { displayContatPage } from './contactPage'
import { displayFormPage } from './formPage'

async function initHeaderButtons() {
  const newContactBtn = document.getElementById("new-contact-btn");
  if (!newContactBtn) {
    console.warn("no newContactBtn")
  } else {
    newContactBtn.addEventListener("click", displayFormPage);
  }

  const contactListBtn = document.getElementById("contact-list-btn");
  if (!contactListBtn) {
    console.warn("no contactListBtn")
  } else {
    contactListBtn.addEventListener("click", displayContatPage);
  }
}
//---------------------------------------------------------------------------------------------
initHeaderButtons();
const formHtmlElement = document.querySelector('#contact-form') as HTMLFormElement | null;
if (!formHtmlElement) {
  console.warn('Form #contact-form not found.');
} else {
  handleSubmit();
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

