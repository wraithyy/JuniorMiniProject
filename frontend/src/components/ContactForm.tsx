import type * as React from "react";
import type { Contact } from '../types/contact';
import '../main.css';
import TextArea from "./TextArea.tsx";
import FieldSet from "./FieldSet.tsx";
import InputComponent from "./InputComponent.tsx";
import {useState} from "react";

import type z from "zod"
import {ContactSchema} from "./ContactSchema.tsx";
import RadioGroup from "./RadioGroup.tsx";

import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

type FormData = z.infer<typeof ContactSchema>



type ContactFormProps = {
    onSubmitForm: (contact: FormData) => Promise<boolean>;
    initialData?: Contact | null,
    errorMessage: string,
}

export const ContactForm = ({ onSubmitForm, initialData,  errorMessage  } : ContactFormProps) => {

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


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
        control,
    } = useForm<FormData>({
        resolver: zodResolver(ContactSchema),
        mode: "onTouched",
        defaultValues: initialData ? initialData : emptyValues
    });


    const onSubmit = async (values: FormData) => {
        console.log(values)
        await onSubmitForm(values)
        reset()
    }

    const neco = useWatch({control})



    const options = [
        {value:"female", label:"Female", name:"gender"},
        {value:"male", label:"Male", name:"gender"},
        {value:"other", label:"Other", name:"gender"},
        {value:"trekkie", label:"Trekkie", name:"gender"},

    ]

    //odstraněny všechny errory
  return (
      <div>
          <h2>{initialData ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</h2>

          <div className="form-group">
              <form className="form-horizontal" id="contactForm" onSubmit={handleSubmit(onSubmit)} noValidate>

                  <label htmlFor={"firstName"}>First Name</label>
                  <input type="text" id={"firstName"} placeholder={"John"} {...register("firstName")}/>
                  { errors.firstName && <p style={{color: "red"}}>{errors.firstName.message}</p>}


                  <label htmlFor={"lastName"}>Last Name</label>
                  <input type="text" id={"lastName"} placeholder={"Smith"} {...register("lastName")}/>
                  { errors.lastName && <p style={{color: "red"}}>{errors.lastName.message}</p>}

                  <label htmlFor={"email"}>Email</label>
                  <input type="text" id={"email"} placeholder={"mail@mail.mail"} {...register("email")}/>
                  { errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}


                  <label htmlFor={"phone"}>Phone</label>
                  <input type="text" id={"phone"} placeholder={"123456789"} {...register("phone")}/>
                  { errors.phone && <p style={{color: "red"}}>{errors.phone.message}</p>}


                  <label htmlFor={"note"}>Note</label>
                  <textarea id={"note"} rows={5} {...register("note")}/>
                  { errors.note && <p style={{color: "red"}}>{errors.note.message}</p>}

                  <fieldset className={"gender"}>
                      <legend>Gender</legend>
                      <label htmlFor={"female"}>Female</label>
                      <input type="radio" id={"female"} value={"female"} {...register("gender")}/>

                      <label htmlFor={"male"}>Male</label>
                      <input type="radio" id={"male"} value={"male"} {...register("gender")}/>

                      <label htmlFor={"other"}>Other</label>
                      <input type="radio" id={"other"} value={"other"} {...register("gender")}/>

                      { errors.gender && <p style={{color: "red"}}>{errors.gender.message}</p>}
                  </fieldset>


                  <fieldset>
                      <legend>Address</legend>

                      <label htmlFor={"city"}>City</label>
                      <input type="text" id={"city"} placeholder={"Gotham"} {...register("city")}/>
                      { errors.city && <p style={{color: "red"}}>{errors.city.message}</p>}

                      <label htmlFor={"street"}>Street</label>
                      <input type="text" id={"street"} placeholder={"Batstreet"} {...register("street")}/>
                      { errors.street && <p style={{color: "red"}}>{errors.street.message}</p>}

                      <label htmlFor={"houseNumber"}>House Number</label>
                      <input type="text" id={"houseNumber"} placeholder={"47"}  {...register("houseNumber")}/>
                      { errors.houseNumber && <p style={{color: "red"}}>{errors.houseNumber.message}</p>}

                      <label htmlFor={"zipCode"}>Zip COde</label>
                      <input type="text" id={"zipCode"} placeholder={"47"}  {...register("zipCode")}/>
                      { errors.zipCode && <p style={{color: "red"}}>{errors.zipCode.message}</p>}
                  </fieldset>


                  <label htmlFor={"birthDate"}>Birth Date</label>
                  <input type="date" id={"birthDate"} placeholder={"birthDate"}  {...register("birthDate")}/>
                  { errors.birthDate && <p style={{color: "red"}}>{errors.birthDate.message}</p>}


                  {/*TODO eventuelně odstranit*/}
                  <button type="button" onClick={() => console.log(neco)} >Console.Log(value)</button>
                  <button type="button" onClick={() => console.log(errors)}> Console.log(errors) </button>


                  <button type="submit" className="submit" disabled={isSubmitting} onClick={() => console.log("click")}>{ isSubmitting ? "Saving..." : "Submit"}</button>
                  <br/>
                  <small style={{color: "red"}}>{errorMessage}</small>

              </form>

          </div>

      </div>
  );
};
