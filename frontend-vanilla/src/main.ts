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


  //Správa tvorby nového kontaktu
  const form = document.getElementById('form');

  if (form) {

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      console.log(e)
      console.log(form)

      //TODO Opravit tuto část, zajistit správné typy dat pomocí TypeScriptu

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

        //birthDate: e.target.birthDate.value // TODO mám tu nějaký problém, že to nelze "cast to date"
      };

      //TODO cleanup všechno html a css <p>


      let errors = [];
      if (!data.firstName) {
        errors.push("First Name");
      }
      if (!data.lastName) {
        errors.push("Last Name");
      }

      //TODO kontrola, že email je reálný
      const emailRegex: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/gm; //regex na poznání emailu
      if (!data.email) {
        errors.push("Email");
      } else if (!emailRegex.test(data.email)) {
        console.log("Email je špatně: " + data.email);
        const email = document.getElementById("incorrectEmail");
        email.innerHTML = "This is not a correct email.";
        errors.push("Email");
      }

      if (errors.length > 0) {

        const errorsMessage = document.getElementById("errors");
        errorsMessage.innerHTML = `You have forgotten to fill out these things in the form: ${errors.toString()}`;

      } else {
        console.log(data);

        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        console.log(result);
      }
    });
  }

}