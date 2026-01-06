import './styles/main.css';
import * as stream from "node:stream";

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

      //TODO Opravit tuto část, zajistit správné typy dat

      //Alternativa od Copilota, zajistí, že všechna data, která přijdou, tak jsou správná, případně je ošetří

      /*const formEl = e.currentTarget as HTMLFormElement;
      const fd = new FormData(formEl);

      const data = {
        firstName: (fd.get('firstName') as string) || '',
        lastName: (fd.get('lastName') as string) || '',
        email: (fd.get('email') as string) || '',
        phone: (fd.get('phone') as string) || '',
        note: (fd.get('note') as string) || '',
        gender: (fd.get('gender') as string) || '',
        city: (fd.get('city') as string) || '',
        street: (fd.get('street') as string) || '',
        houseNumber: (fd.get('houseNumber') as string) || '',
        zipCode: (fd.get('zipCode') as string) || 0,
        birthDate: (fd.get('birthDate') as string) || '',
      };*/


      //Problém: sice funkční, ale nazjišťuje, že opravdu přijdou správná data
      const data = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        note: e.target.note.value,
        gender: e.target.gender.value,
        city: e.target.city.value,
        street: e.target.street.value,
        houseNumber: e.target.houseNumber.value,
        zipCode: e.target.zipCode.value,

        //birthDate: e.target.birthDate.value //mám tu nějaký problém, že to nelze "cast to date"
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