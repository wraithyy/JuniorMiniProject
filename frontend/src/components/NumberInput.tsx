type NumberInputProps = {
    idName: string;
    name: string;
    value?: number;
    required?: boolean;
}

export default function NumberInput({idName, name, value, required}: NumberInputProps) {


    return (
        <>
            <label htmlFor={idName}>{name}</label>
            <input type="number" name={idName} id={idName} value={value} required={required}  />
        </>
    )
}