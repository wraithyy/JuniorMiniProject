import {Controller, useFormContext} from "react-hook-form";

type InputComponentProps = {

    id: string,
    label: string,
    type: string,
    name: string,
    placeholder?: string
    required?: boolean,


}

export default function InputComponent({id, label, type, name, placeholder}: InputComponentProps) {

    //TODO kontrola pokud type=date, tak kontrola, že se člověk nenarodil v budoucnosti


    const {control, formState: {errors}} = useFormContext()



    return (

        <Controller name={name}
                    control={control}
                    render={({field}) => (
                        <div>
                            {type === "hidden" ? null : <label htmlFor={id}>{label}</label>}
                            <input type={type} name={name} id={id}  placeholder={placeholder}
                                   onChange={field.onChange}  onBlur={field.onBlur}
                                   value={type==="date" ? String(field.value).substring(0 ,10) : field.value}
                            />
                            { errors[id] && <div style={{color: "red"}}>{errors[id]?.message as string}</div> }
                        </div>
                    )}
        />



    )
}