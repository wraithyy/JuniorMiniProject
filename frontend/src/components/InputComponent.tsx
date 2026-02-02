import {ChangeEvent} from "react";

type InputComponentProps = {

    id: string,
    label: string,
    type: string,
    name: string,
    placeholder?: string
    value?: string | number,
    required?: boolean,
    error?: string,

    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void,


}

export default function InputComponent({id, label, type, name, placeholder, value, error, onChange, onBlur }: InputComponentProps) {

    //TODO kontrola pokud type=date, tak kontrola, že se člověk nenarodil v budoucnosti


    return (
        <>
            <div className={name === "gender" ? "singleGender" : undefined}>
                <label htmlFor={id}>{label}</label>
                <input type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange}  onBlur={onBlur}/>
                { error && <div style={{color: "red"}}>{error}</div> }
            </div>
        </>
    )
}