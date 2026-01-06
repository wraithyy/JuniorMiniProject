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
  //app.innerHTML = '';


  //Správa tvorby nvého kontaktu
  const form = document.getElementById('form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      console.log(e)
      console.log(form)

      const data = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: "",
        note: "",
        gender: "",
        city: "",
        street: "",
        houseNumber: "",
        zipCode: 0,
        birthDate: "",
      };

      console.log(data);

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      console.log(result);
    });
  }



  //List kontaktů
  const response = await fetch('/api/contacts');
  const data = await response.json();
  const contacts = data.data;
  console.log(contacts);

// Vyrenderovat seznam pomocí DOM manipulace
/*  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.textContent = `${contact.firstName} ${contact.lastName}`;
    li.addEventListener('click', () => {
      // Zobrazit detail
    });
    list.appendChild(li);
  });*/
}