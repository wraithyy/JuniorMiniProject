import {ChangeEvent} from "react";

type TextAreaProps = {
    idName: string;
    name: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    value?: string;
    error?: string;

    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({idName, name, placeholder, rows, required, value, error, onChange, onBlur}: TextAreaProps) {



    return (
        <>
            <label htmlFor={idName}>{name} ({value?.length ? value.length : 0}/1000)</label>
            <textarea name={idName} id={idName} placeholder={placeholder} rows={rows} required={required} onBlur={onBlur} onChange={onChange} value={value} />
            { error && <div style={{color: "red"}}>{error}</div> }
        </>
    )
}