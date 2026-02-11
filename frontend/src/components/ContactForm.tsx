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

import {Controller, useForm, useWatch} from "react-hook-form";
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

                  {/* TODO Při úpravě se nemaže, ale změna funguje */}


                  <Controller control={control} name={"firstName"}
                              render={({ field }) => (
                                  <InputComponent
                                      label="First Name"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      id={"firstName"} type={"text"} name={"firstName"} placeholder={"John"}
                                      error={errors.firstName?.message}

                                  />
                              )}
                  />

                  <Controller control={control} name={"lastName"}
                              render={({ field }) => (
                                  <InputComponent
                                      label="Last Name"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      id={"lastName"} type={"text"} name={"lastName"} placeholder={"Smith"}
                                      error={errors.lastName?.message}

                                  />
                              )}
                  />

                  <Controller control={control} name={"email"}
                              render={({ field }) => (
                                  <InputComponent
                                      label="Email"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      id={"email"} type={"text"} name={"email"} placeholder={"example@example.com"}
                                      error={errors.email?.message}

                                  />
                              )}
                  />

                  <Controller control={control} name={"phone"}
                              render={({ field }) => (
                                  <InputComponent
                                      label="Phone"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      id={"phone"} type={"text"} name={"phone"} placeholder={"123 456 789"}
                                      error={errors.phone?.message}

                                  />
                              )}
                  />


                  <Controller control={control} name={"note"}
                              render={({ field }) => (
                                  <TextArea id={"note"} name={"note"} label={"Note"} placeholder={"Write something..."} rows={5}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            error={errors.note?.message}
                                  />
                              )}
                  />


                  <FieldSet id={"gender"} legend={"Gender"} >

                      <Controller control={control}  name={"gender"} render={({field}) => (
                          <RadioGroup options={options}
                                      value={field?.value}
                                      onChange={field.onChange} onBlur={field.onBlur}
                          />
                      )}
                      />

                  </FieldSet>


                  <FieldSet id={"address"} legend={"Address"} >

                      <Controller control={control} name={"city"}
                                  render={({ field }) => (
                                      <InputComponent
                                          label="City"
                                          value={field.value}
                                          onChange={field.onChange}
                                          onBlur={field.onBlur}
                                          id={"city"} type={"text"} name={"city"} placeholder={"Gotham"}
                                          error={errors.city?.message}

                                      />
                                  )}
                      />

                      <Controller control={control} name={"street"}
                                  render={({ field }) => (
                                      <InputComponent
                                          label="Street"
                                          value={field.value}
                                          onChange={field.onChange}
                                          onBlur={field.onBlur}
                                          id={"street"} type={"text"} name={"street"} placeholder={"Batstreet"}
                                          error={errors.street?.message}

                                      />
                                  )}
                      />

                      <Controller control={control} name={"houseNumber"}
                                  render={({ field }) => (
                                      <InputComponent
                                          label="House Number"
                                          value={field.value}
                                          onChange={field.onChange}
                                          onBlur={field.onBlur}
                                          id={"houseNumber"} type={"text"} name={"houseNumber"} placeholder={"42"}
                                          error={errors.houseNumber?.message}

                                      />
                                  )}
                      />


                      <Controller control={control} name={"zipCode"}
                                  render={({ field }) => (
                                      <InputComponent
                                          label="Zip Code"
                                          value={field.value}
                                          onChange={field.onChange}
                                          onBlur={field.onBlur}
                                          id={"zipCode"} type={"number"} name={"zipCode"} placeholder={"47"}
                                          error={errors.zipCode?.message}

                                      />
                                  )}
                      />


                  </FieldSet>


                  <Controller control={control} name={"birthDate"}
                              render={({ field }) => (
                                  <InputComponent
                                      label="Birth Date"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      id={"birthDate"} type={"date"} name={"birthDate"}
                                      error={errors.birthDate?.message}

                                  />
                              )}
                  />


                  {/*TODO eventuelně odstranit*/}
                  <button type="button" onClick={() => console.log(neco)} >Console.Log(value)</button>
                  <button type="button" onClick={() => console.log(errors)}> Console.log(errors) </button>


                  <button type="submit" className="submit" disabled={isSubmitting}>{ isSubmitting ? "Saving..." : "Submit"}</button>
                  <br/>
                  <small style={{color: "red"}}>{errorMessage}</small>

              </form>

          </div>

      </div>
  );
};
