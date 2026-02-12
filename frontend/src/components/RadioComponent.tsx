import type {ChangeEvent} from "react";
import {Controller, useFormContext} from "react-hook-form";

type InputComponentProps = {

    id: string,
    label: string,
    name: string,
    value?: string,
    data?: string
    required?: boolean,
    error?: string,

    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void,
    checked: boolean


}

export default function RadioComponent({id, label, name, checked, value }: InputComponentProps) {

    const {control} = useFormContext()

    return (


            <Controller  name={name}
                         control={control}
                         render={({field}) => (
                             <div className={"singleGender"}>

                                 <label htmlFor={id}>{label}</label>

                                 <input type={"radio"} name={name} id={id} checked={checked}
                                        value={value}  onChange={field.onChange}  onBlur={field.onBlur}

                                 />
                             </div>
                         )}
            />


        )
}