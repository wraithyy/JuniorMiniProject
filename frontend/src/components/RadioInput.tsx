type RadioInputProps = {
    idName: string;
    name: string;
}

export default function RadioInput({idName, name}: RadioInputProps) {

    const label = idName[0].toUpperCase() + idName.slice(1);

    return (
        <>
            <span className={"singleGender"}>
                <input type="radio" name={name} id={idName} value={idName} />
                <label htmlFor={idName}>{label}</label>
            </span>

        </>
    )
}