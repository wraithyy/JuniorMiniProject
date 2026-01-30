import { hideContactList } from './contactPage'
import { Contact } from './types'
import { cutDateToYYYYMMDD } from './helpers'
import { form, formContainer } from './helpers';

const SUBMIT_BTN = document.getElementById("submit-btn");


export function hideForm() {
  if (formContainer) {
    formContainer.style.display = "none";
  }
}

export function displayForm() {
  if (formContainer) {
    formContainer.style.display = "block";
  }
}

export function displayFormPage() {
  nameSubmitButton("Add");
  hideContactList();
  if (form) {
    form.reset();
  }
  displayForm();
}

function setInputValue(inputId: string, value: string) {
  if (value) {
    if (formContainer) {
      const inputElement = formContainer.querySelector(`#${inputId}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = value;
      }
    }
  }
}

function nameSubmitButton(operationType: string) {
  if (SUBMIT_BTN) {
    SUBMIT_BTN.textContent = operationType + " Contact";
  }
}

export function fillFromSaved(contact: Contact) {
  nameSubmitButton("Update");
  form?.setAttribute("data-contact-id", contact._id);

  if (formContainer) {
    if (form) {
      form.reset();
    }
    setInputValue("firstName", contact.firstName);
    setInputValue("lastName", contact.lastName);
    setInputValue("email", contact.email);
    setInputValue("phone", contact.phone);
    setInputValue("city", contact.city);
    setInputValue("street", contact.street);
    setInputValue("houseNumber", contact.houseNumber);
    setInputValue("zipCode", contact.zipCode);
    setInputValue("note", contact.note);
    setInputValue("birthDate", cutDateToYYYYMMDD(contact.birthDate));

    const genderInput = formContainer.querySelector(
      `input[name="gender"][value="${contact.gender}"]`
    ) as HTMLInputElement | null;
    if (genderInput) {
      genderInput.checked = true;
    }
  }
}
