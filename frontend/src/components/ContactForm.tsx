import * as React from "react";
import type { Contact } from '../types/contact';
import '../main.css';
import TextArea from "./TextArea.tsx";
import RadioInput from "./RadioInput.tsx";
import FieldSet from "./FieldSet.tsx";
import InputComponent from "./InputComponent.tsx";
import {useState} from "react";

import * as z from "zod"


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


    //{ _id ? (<InputComponent id={"_id"} type={"hidden"} name={"_id"} label={"ID:"} />) : null } //TODO tohle přidat, až budu mít _id

    const [value, setValue] = useState<Contact>(
        initialData ?
            initialData
            : {
                _id: "",
                firstName: "",
                lastName: "",
                email: "",
                gender: "",
                phone: "",
                note: "",
                city: "",
                street: "",
                houseNumber: "",
                zipCode: 0,
                birthDate: "",
            }
    );

    const [errors, setErrors] = useState(""); //TODO tohle eventuelněz měnit na object a přidat special error message ke každému inputu


    function handleOnBlur(e){
        e.preventDefault();

        const Email = z.email()

        if (e.target.id === "email") {

            if (Email.safeParse(e.target.value).success) {
                setErrors("")
                console.log("vše ok")

            } else {
                setErrors("Špatný email")
                console.log("špatný email")
            }

        }

        //TODO kontrola emailu
        //         //TODo ZOD
        //         //TODO onBlur
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        })

    }

    //submit working like this nice
    function handleSubmit() {
        //TODO kontrola vyplněných povinných dat
        //TODO kontrola validních dat

        if(!value.firstName) {

        } else if(!value.lastName) {

        } else if(!value.email) {

        } else {
            onSubmit(value);
        }

    }


  return (
      <div>
          <h2>{initialData ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>

          <div id={"errors"} style={{color: "red"}}>{errors}</div>

          <div className="form-group">
              <form className="form-horizontal" id="contactForm" action={handleSubmit}>

                  <InputComponent id={"firstName"} label={"First Name"} type={"text"} name={"firstName"} placeholder={"John"} value={value?.firstName} onChange={(e) => handleInputChange(e)} required />

                  <InputComponent id={"lastName"} label={"Last Name"} type={"text"} name={"text"} placeholder={"Smith"} value={value?.lastName} onChange={(e) => handleInputChange(e)}  required/>

                  <InputComponent
                      id={"email"} label={"Email"} type={"email"} name={"email"} placeholder={"john.smith@tardis.uk"}
                      value={value?.email} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                      required/>


                  <InputComponent id={"phone"} label={"Phone"} type={"tel"} name={"phone"} placeholder={"+420 123 456 789"} value={value?.phone} onChange={(e) => handleInputChange(e)} />


                  <TextArea idName={"note"} name={"Note"} placeholder={"Enter some notes about your new contact..."} value={value?.note} onChange={(e) => handleInputChange(e)} />


                  {/* TODO udělat a vyřešit radio input fieldset, momentálně ho ignoruji */}
                  <FieldSet id={"gender"} legend={"Gender"} className={"gender"} >
                      <RadioInput idName={"female"} name={"gender"} />
                      <RadioInput idName={"male"} name={"gender"} />
                      <RadioInput idName={"other"} name={"gender"} />
                  </FieldSet>

                  <FieldSet id={"address"} legend={"Address"} >

                      <InputComponent id={"city"} label={"City"} type={"text"} name={"city"} placeholder={"Gotham"} value={value?.city} onChange={(e) => handleInputChange(e)}  />
                      <InputComponent id={"street"} label={"Street"} type={"text"} name={"street"} placeholder={"Batstreet"} value={value?.street} onChange={(e) => handleInputChange(e)} />
                      <InputComponent id={"houseNumber"} label={"House Number"} type={"text"} name={"houseNumber"} placeholder={"47"} value={value?.houseNumber} onChange={(e) => handleInputChange(e)} />
                      <InputComponent id={"zipCode"} label={"Zip Code"} type={"number"} name={"zipCode"} value={value?.zipCode} onChange={(e) => handleInputChange(e)} />

                  </FieldSet>


                  {/* TODO opravit type date, aby se vše ve skutečnosti zobrazovalo */}
                  <InputComponent id={"birthDate"} label={"Birthday"} type={"date"} name={"birthdate"} value={value?.birthDate} onChange={(e) => handleInputChange(e)}/>

                  <button type="button" onClick={() => console.log(value)} >Console.Log()</button>


                  <button type="submit" className="submit">Submit</button>
                  <small id="message"></small>

              </form>

          </div>

      </div>
  );
};
