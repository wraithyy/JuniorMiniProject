type TextAreaProps = {
    idName: string;
    name: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
}

export default function TextArea({idName, name, placeholder, rows, required}: TextAreaProps) {


    return (
        <>
            <label htmlFor={idName}>{name}</label>
            <textarea name={idName} id={idName} placeholder={placeholder} rows={rows} required={required}  />
        </>
    )
}