type TextInputProps = {
    idName: string;
    name: string;
    placeholder: string;
    required?: boolean;
}

export default function TextInput({idName, name, placeholder, required = false}: TextInputProps) {


    return (
        <>
            <label htmlFor={idName}>{name}</label>
            <input type="text" name={idName} id={idName} placeholder={placeholder} required={required}  />
        </>
    )
}