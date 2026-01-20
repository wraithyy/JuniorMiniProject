import '/src/styles/main.css';
//import * as stream from "node:stream";
import {parse, isValid, formatDate} from 'date-fns';
import {Contact} from "./Contact.ts";



console.log('Vanilla TypeScript frontend připraven k implementaci!');

const app = document.getElementById('app');

const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const id = searchParams.get("id") ?? null;
console.log("ID: " + id);


if (app) {

  if (id) {
    try {
      const response = await fetch(`/api/contacts/${id}`)
      const data = await response.json();
      const contact = data.data as Contact;



      for (const key of Object.keys(contact) as Array<keyof Contact>) {
        const value = contact[key];
        if (value == null) continue;

        if (key === 'note') {
          const el = document.getElementById('note');
          if (el) el.textContent = String(value);
          continue;
        }

        if (key === 'gender') {
          const radio = document.getElementById(String(value)) as HTMLInputElement | null;
          radio?.setAttribute('checked', 'checked');
          continue;
        }

        if (key === 'birthDate') {
          const date = formatDate(String(value), 'yyyy-MM-dd');
          document.getElementById('birthDate')?.setAttribute('value', date);
          continue;
        }

        const el = document.getElementById(key as string);
        if (el) el.setAttribute('value', String(value));

      }

    }
    catch (e) {

    }
  }

  //Kontrola datummu, použita knihovna date-fns
  const birthDateEl = document.getElementById('birthDate') as HTMLInputElement;
  const errorEl = document.getElementById('birthDateError') as HTMLElement;

  birthDateEl.max = formatDate(new Date(), "yyyy-MM-dd");

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

        //TODO tady možná úpravu při existujícím uživateli
        const contactForm = document.getElementById("contactForm") as HTMLFormElement;
        if (contactForm) {contactForm.reset()}


        const message = document.getElementById("message") as HTMLElement;
        message.innerText = "Saving your contact...";
        message.style.color = "blue";

        let response: Response;

        if (id){
          response = await fetch(`/api/contacts/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })

        } else {
          response = await fetch('/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }

        const result = await response.json();

        if (!result.ok) {
          message.innerText = "There has been an error while saving the contact (╥﹏╥)"
          message.style.color = "red";
        } else {
          message.style.color = "green";
          message.innerText = "Contact was successfully saved;";
          message.style.opacity = "1";
          message.style.transition = "opacity 1s ease"

          setTimeout(() =>{
            message.style.opacity = "0";
          }, 5000)
        }

        console.log(result);
      }
    });
  }

}