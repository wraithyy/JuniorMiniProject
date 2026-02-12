import type * as React from "react";
import type { Contact } from '../types/contact';
import '../main.css';
import TextArea from "./TextArea.tsx";
import FieldSet from "./FieldSet.tsx";
import InputComponent from "./InputComponent.tsx";

import type z from "zod"
import {ContactSchema} from "./ContactSchema.tsx";
import RadioGroup from "./RadioGroup.tsx";

import { FormProvider, useForm, useWatch} from "react-hook-form";
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





    const methods = useForm<FormData>({
        resolver: zodResolver(ContactSchema),
        mode: "onTouched",
        defaultValues: initialData ?? emptyValues,
    });

    const { handleSubmit, formState: { errors, isSubmitting }, reset, control } = methods;



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

              <FormProvider {...methods} >

              <form className="form-horizontal" id="contactForm" onSubmit={handleSubmit(onSubmit)} noValidate>

                  {/* TODO Při úpravě se nemaže, ale změna funguje */}


                  <InputComponent
                      label="First Name"
                      id={"firstName"}
                      type={"text"}
                      name={"firstName"}
                      placeholder={"John"}

                  />

                  <InputComponent
                      label="Last Name"
                      id={"lastName"}
                      type={"text"}
                      name={"lastName"}
                      placeholder={"Smith"}

                  />


                  <InputComponent
                      label="Email"
                      id={"email"}
                      type={"text"}
                      name={"email"}
                      placeholder={"example@example.com"}

                  />


                  <InputComponent
                      label="Phone"
                      id={"phone"}
                      type={"text"}
                      name={"phone"}
                      placeholder={"123 456 789"}

                  />

                  <TextArea id={"note"}
                            name={"note"}
                            label={"Note"}
                            placeholder={"Write bitch!"}

                  />




                  <FieldSet id={"gender"}
                            legend={"Gender"} >
                                      <RadioGroup options={options} name={"gender"} />

                  </FieldSet>


                  <FieldSet id={"address"}
                            legend={"Address"} >

                          <InputComponent
                              label="City"
                              id={"city"}
                              type={"text"}
                              name={"city"}
                              placeholder={"Gotham"}

                          />

                          <InputComponent
                              label="Street"
                              id={"street"}
                              type={"text"}
                              name={"street"}
                              placeholder={"Batstreet"}

                          />

                          <InputComponent
                              label="House Number"
                              id={"houseNumber"}
                              type={"text"}
                              name={"houseNumber"}
                              placeholder={"42"}

                          />


                          <InputComponent
                              label="Zip Code"
                              id={"zipCode"}
                              type={"number"}
                              name={"zipCode"}
                              placeholder={"47"}

                          />


                  </FieldSet>


                  <InputComponent
                      label="Birth Date"
                      id={"birthDate"}
                      type={"date"}
                      name={"birthDate"}

                  />


                  {/*TODO eventuelně odstranit*/}
                  <button type="button" onClick={() => console.log(neco)} >Console.Log(value)</button>
                  <button type="button" onClick={() => console.log(errors)}> Console.log(errors) </button>


                  <button type="submit" className="submit" disabled={isSubmitting}>{ isSubmitting ? "Saving..." : "Submit"}</button>
                  <br/>
                  <small style={{color: "red"}}>{errorMessage}</small>

              </form>

              </FormProvider>

          </div>

      </div>
  );
};
