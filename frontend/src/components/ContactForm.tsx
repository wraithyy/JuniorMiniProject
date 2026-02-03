import * as React from "react";
import type { Contact } from '../types/contact';
import '../main.css';
import TextArea from "./TextArea.tsx";
import FieldSet from "./FieldSet.tsx";
import InputComponent from "./InputComponent.tsx";
import {useState} from "react";

import z from "zod"
import {ContactSchema} from "./ContactSchema.tsx";



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

    const emptyValues = {
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

    const [value, setValue] = useState<Contact>(
        initialData ? initialData : emptyValues
    );


    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        note: "",
        gender: "",
        city: "",
        street: "",
        houseNumber: "",
        zipCode: "",
        birthDate: "",

    });

    //tohle funguje, ale nechápu jak
    const fieldSchema = <K extends keyof z.infer<typeof ContactSchema>>(key: K) =>
        ContactSchema.shape[key];


    function validate(name: keyof Omit<Contact, "_id" | "create_date">, data: string | number){

        const result = fieldSchema(name).safeParse(data);

        if (!result.success) {
            setErrors({
                ...errors,
                [name] : result.error.issues[0].message,
            });
        } else {
            setErrors({
                ...errors,
                [name] : "",
            })
        }


    }


    function handleOnBlur(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        e.preventDefault();
        validate(e.target.name, e.target.value)

    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const data = e.target.name === "zipCode" ? parseInt(e.target.value) : e.target.value;

        setValue({
            ...value,
            [e.target.name]: data,
        })

    }

    //submit working like this nice
    function handleSubmit() {

        const result = ContactSchema.safeParse(value)

        if (!result.success) {
            console.log("not okay")

            result.error.issues.forEach((element) => {
                setErrors(errors => ({
                    ...errors,
                    [element.path[0]] : element.message,
                }));
            })



        } else {
            onSubmit(value)
            console.log("submitted")

            setValue(emptyValues)
        }


    }


  return (
      <div>
          <h2>{initialData ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>

          <div className="form-group">
              <form className="form-horizontal" id="contactForm" action={handleSubmit}>

                  <InputComponent
                      id={"firstName"} label={"First Name"} type={"text"} name={"firstName"} placeholder={"John"} error={errors?.firstName}
                      value={value?.firstName} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                       />

                  <InputComponent
                      id={"lastName"} label={"Last Name"} type={"text"} name={"lastName"} placeholder={"Smith"} error={errors?.lastName}
                      value={value?.lastName} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                      />

                  <InputComponent
                      id={"email"} label={"Email"} type={"email"} name={"email"} placeholder={"john.smith@tardis.uk"} error={errors?.email}
                      value={value?.email} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                      />


                  <InputComponent
                      id={"phone"} label={"Phone"} type={"tel"} name={"phone"} placeholder={"+420 123 456 789"} error={errors?.phone}
                      value={value?.phone} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                  />


                  <TextArea
                      idName={"note"} name={"Note"} placeholder={"Enter some notes about your new contact..."} error={errors?.note}
                      value={value?.note} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                  />



                  <FieldSet id={"gender"} legend={"Gender"} className={"gender"} >
                      <InputComponent id={"female"} label={"Female"} type={"radio"} name={"gender"} value={"female"}
                      onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}/>

                      <InputComponent id={"male"} label={"Male"} type={"radio"} name={"gender"} value={"male"}
                      onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}/>

                      <InputComponent id={"other"} label={"Other"} type={"radio"} name={"gender"} value={"other"}
                      onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}/>
                  </FieldSet>

                  <FieldSet id={"address"} legend={"Address"} >

                      <InputComponent
                          id={"city"} label={"City"} type={"text"} name={"city"} placeholder={"Gotham"} error={errors?.city}
                          value={value?.city} onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => handleOnBlur(e)}
                      />

                      <InputComponent
                          id={"street"} label={"Street"} type={"text"} name={"street"} placeholder={"Batstreet"} error={errors?.street}
                          value={value?.street} onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => handleOnBlur(e)}
                      />

                      <InputComponent
                          id={"houseNumber"} label={"House Number"} type={"text"} name={"houseNumber"} placeholder={"47"} error={errors?.houseNumber}
                          value={value?.houseNumber} onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => handleOnBlur(e)}
                      />

                      <InputComponent
                          id={"zipCode"} label={"Zip Code"} type={"number"} name={"zipCode"} error={errors?.zipCode}
                          value={value?.zipCode} onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => handleOnBlur(e)}
                      />

                  </FieldSet>


                  <InputComponent
                      id={"birthDate"} label={"Birthday"} type={"date"} name={"birthDate"} error={errors?.birthDate}
                      value={value?.birthDate} onChange={(e) => handleInputChange(e)}
                      onBlur={(e) => handleOnBlur(e)}
                  />

                  {/*TODO eventuelně odstranit*/}
                  <button type="button" onClick={() => console.log(value)} >Console.Log(value)</button>
                  <button type="button" onClick={() => console.log(errors)}> Console.log(errors) </button>


                  <button type="submit" className="submit">Submit</button>
                  <small id="message"></small>

              </form>

          </div>

      </div>
  );
};
