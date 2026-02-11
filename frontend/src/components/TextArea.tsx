import {ChangeEvent} from "react";

type TextAreaProps = {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    value?: string;
    error?: string;

    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({id, name, label, placeholder, rows, required, value, error, onChange, onBlur}: TextAreaProps) {



    return (
        <>
            <label htmlFor={id}>{label} ({value?.length ? value.length : 0}/1000)</label>
            <textarea name={name} id={id} placeholder={placeholder} rows={rows} required={required} onBlur={onBlur} onChange={onChange} value={value} />
            { error && <div style={{color: "red"}}>{error}</div> }
        </>
    )
}