import {ChangeEvent} from "react";

type InputComponentProps = {

    id: string,
    label: string,
    type: string,
    name: string,
    placeholder?: string
    value?: string | number,
    required?: boolean,

    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void,


}

export default function InputComponent({id, label, type, name, placeholder, value, onChange, onBlur }: InputComponentProps) {

    //TODO kontrola pokud type=date, tak kontrola, že se člověk nenarodil v budoucnosti

    // @ts-ignore //value dělá problémy, kvůli string readonly
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange}  onBlur={onBlur}/>
        </>
    )
}