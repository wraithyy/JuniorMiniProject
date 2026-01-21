type DateInputProps = {
    idName: string;
    name: string;
    value?: number;
    required?: boolean;
}

export default function DateInput({idName, name, value = "1970-01-01", required = false} : DateInputProps) {

    //You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

    //TODO přidat max date value
    return (
        <>
            <label htmlFor={idName}>{name}</label>
            <input type="date" name={idName} id={idName} required={required} />
        </>
    )
}