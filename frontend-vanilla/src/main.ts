import './styles/main.css';

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
  app.innerHTML = `
    <h1>Contact Manager</h1>
    <form id="contact-form">
      <input type="text" id="name" placeholder="Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <button type="submit">Add Contact</button>
    </form>
    <div id="contact-list">
      <p>No contacts yet...</p>
    </div>
  `;
}

