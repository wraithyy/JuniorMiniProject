import './styles/main.css';
//import * as stream from "node:stream";
import {parse, isValid} from 'date-fns';

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

  //Kontrola datummu, použita knihovna date-fns
  const birthDateEl = document.getElementById('birthDate') as HTMLInputElement;
  const errorEl = document.getElementById('birthDateError') as HTMLInputElement;

  birthDateEl.addEventListener('change', () => {

    const raw = birthDateEl.value;

    const date = parse(raw, 'yyyy-MM-dd', new Date());
    if (!isValid(date)) {
      errorEl.textContent = "Please enter a valid date.";
      return;
    }
    errorEl.textContent = "";
  })


  //Správa tvorby nového kontaktu
  const form = document.getElementById('form') as HTMLFormElement;

  if (form) {

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      console.log(e)
      console.log(form)

      //TODO Opravit tuto část, zajistit správné typy dat pomocí TypeScriptu

      const data = {
        firstName: e?.target?.firstName.value ?? "",
        lastName: e?.target?.lastName.value  ?? "",
        email: e?.target?.email.value  ?? "",
        phone: e?.target?.phone.value ?? "",
        note: e?.target?.note.value ?? "",
        gender: e?.target?.gender.value ?? "",
        city: e?.target?.city.value ?? "",
        street: e?.target?.street.value ?? "",
        houseNumber: e?.target?.houseNumber.value ?? "",
        zipCode: e?.target?.zipCode.value ?? 0,
        birthDate: e?.target?.birthDate.value ?? "",
      };



      let errors = [];
      if (!data.firstName) {
        errors.push("First Name");
      }
      if (!data.lastName) {
        errors.push("Last Name");
      }

      //Kontrola, že email je reálný
      const emailRegex: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/gm; //regex na poznání emailu

      if (!data.email) {
        errors.push("Email");
      } else if (!emailRegex.test(data.email)) {
        console.log("Email je špatně: " + data.email);
        const email = document.getElementById("incorrectEmail");
        if (email) {
          email.innerHTML = "This is not a correct email.";
        }
        errors.push("Email");
      }

      //Kontrola errorů, buďto error messages anebo se vše pošle a form reset()
      if (errors.length > 0) {
        const errorsMessage = document.getElementById("errors");
        if (errorsMessage) {
          errorsMessage.innerHTML = `You have forgotten to fill out these things in the form: ${errors.toString()}`;
        }
      } else {

        //CleanUp existujících zpráv
        const errorsMessage = document.getElementById("errors");
        errorsMessage ? errorsMessage.innerHTML = "" : null;

        const incorrectEmail = document.getElementById("incorrectEmail");
        incorrectEmail ? incorrectEmail.innerHTML = "" : null;

        const contactForm = document.getElementById("contactForm") as HTMLFormElement;
        if (contactForm) {contactForm.reset()}


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