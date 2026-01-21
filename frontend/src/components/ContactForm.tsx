import type { FC } from 'react';
import type { Contact } from '../types/contact';
import '../main.css';
import TextInput from "./TextInput.tsx";
import NumberInput from "./NumberInput.tsx";
import TextArea from "./TextArea.tsx";
import TelInput from "./TelInput.tsx";
import DateInput from "./DateInput.tsx";
import RadioInput from "./RadioInput.tsx";
import FieldSet from "./FieldSet.tsx";
import InputComponent from "./InputComponent.tsx";

type ContactFormProps = {
    onSubmit: (contact: Omit<Contact, '_id' | 'create_date'>) => void;
    initialData?: Contact,
}

export const ContactForm = ({ onSubmit, initialData } : ContactFormProps) => {
  // TODO: Implementovat formulář s těmito prvky:
  //
  // Povinná pole:
  // - firstName (text input)
  // - lastName (text input)
  // - email (email input)
  //
  // Radio buttons pro pohlaví:
  // - gender (mužské/ženské/jiné)
  //
  // Volitelná pole:
  // - phone (tel input)
  // - note (textarea)
  // - city (text input)
  // - street (text input)
  // - houseNumber (text input)
  // - zipCode (number input)
  // - birthDate (date input) - hezky naformátované
  //
  // Funkcionality:
  // - Validace (povinná pole, validní email)
  // - Zobrazení chybových hlášek
  // - Styling pomocí CSS/SCSS
  //
  // Bonusové úkoly:
  // - Loading indikátor při odesílání
  // - Zobrazení úspěšné/chybové hlášky po odeslání
  //
  // Použití:
  // - Použít připravený contactsApi.createContact() nebo contactsApi.updateContact()
  // - Pro přístup k API klientu: import { contactsApi } from '../api/contactsApi'

  return (
      <div>
          <h2>{initialData ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>


          <div className="form-group">
              <form className="form-horizontal" id="contactForm">

                  <InputComponent id={"firstName"} label={"First Name"} type={"text"} name={"firstName"} placeholder={"John"} required/>

                  <InputComponent id={"lastName"} label={"Last Name"} type={"text"} name={"text"} placeholder={"Smith"}  required/>

                  <InputComponent id={"email"} label={"Email"} type={"email"} name={"email"} placeholder={"john.smith@tardic.uk"} required/>


                  <InputComponent id={"phone"} label={"Phone"} type={"tel"} name={"phone"} placeholder={"+420 123 456 789"} />


                  <TextArea idName={"note"} name={"Note"} placeholder={"Enter some notes about your new contact..."} />


                  <FieldSet id={"gender"} legend={"Gender"} className={"gender"} >
                      <RadioInput idName={"female"} name={"gender"} />
                      <RadioInput idName={"male"} name={"gender"} />
                      <RadioInput idName={"other"} name={"gender"} />
                  </FieldSet>

                  <FieldSet id={"address"} legend={"Address"} >

                      <InputComponent id={"city"} label={"City"} type={"text"} name={"city"} placeholder={"Gotham"} />
                      <InputComponent id={"street"} label={"Street"} type={"text"} name={"street"} placeholder={"Batstreet"} />
                      <InputComponent id={"houseNumber"} label={"House Number"} type={"text"} name={"houseNumber"} placeholder={"47"} />
                      <InputComponent id={"zipCode"} label={"Zip Code"} type={"number"} name={"zipCode"} />

                  </FieldSet>


                  <InputComponent id={"birthDate"} label={"Birthday"} type={"date"} name={"birthdate"} />


                  <button type="submit" className="submit">Submit</button>
                  <small id="message"></small>

              </form>

          </div>

      </div>
  );
};
