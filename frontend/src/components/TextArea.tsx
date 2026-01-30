import {ChangeEvent} from "react";

type TextAreaProps = {
    idName: string;
    name: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({idName, name, placeholder, rows, required, value, onChange}: TextAreaProps) {


    return (
        <>
            <label htmlFor={idName}>{name}</label>
            <textarea name={idName} id={idName} placeholder={placeholder} rows={rows} required={required}  onChange={onChange} value={value} />
        </>
    )
}