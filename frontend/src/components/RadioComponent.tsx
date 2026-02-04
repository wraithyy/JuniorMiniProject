import type {ChangeEvent} from "react";

type InputComponentProps = {

    id: string,
    label: string,
    name: string,
    value?: string,
    data?: string
    required?: boolean,
    error?: string,

    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void,


}

export default function RadioComponent({id, label, name, data, value, error, onChange, onBlur }: InputComponentProps) {

    return (
        <div className={name === "gender" ? "singleGender" : undefined}>
            <label htmlFor={id}>{label}</label>
            <input type={"radio"} name={name} id={id} value={value}  onChange={onChange}  onBlur={onBlur}
                   checked={data === value}
            />
            { error && <div style={{color: "red"}}>{error}</div> }
        </div>
        )
}