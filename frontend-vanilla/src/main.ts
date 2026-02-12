import "./styles/main.css";
import { displayContatPage } from "./contactPage";
import { displayFormPage } from "./formPage";
import handleSubmit from "./submit";

async function initHeaderButtons() {
  const newContactBtn = document.getElementById("new-contact-btn");
  if (newContactBtn) {
    newContactBtn.addEventListener("click", displayFormPage);
  } else {
    console.warn("no newContactBtn");
  }

  const contactListBtn = document.getElementById("contact-list-btn");
  if (contactListBtn) {
    contactListBtn.addEventListener("click", displayContatPage);
  } else {
    console.warn("no contactListBtn");
  }
}
//---------------------------------------------------------------------------------------------
initHeaderButtons();
const formHtmlElement = document.querySelector(
  "#contact-form"
) as HTMLFormElement | null;
if (formHtmlElement) {
  handleSubmit();
} else {
  console.warn("Form #contact-form not found.");
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
