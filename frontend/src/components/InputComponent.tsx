type InputComponentProps = {

    id: string,
    label: string,
    type: string,
    name: string,
    placeholder?: string
    value?: string,
    required?: boolean


}

export default function InputComponent({id, label, type, name, placeholder, value }: InputComponentProps) {

    //TODO kontrola pokud type=date, tak kontrola, že se člověk nenarodil v budoucnosti

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} value={value} placeholder={placeholder} />
        </>
    )
}