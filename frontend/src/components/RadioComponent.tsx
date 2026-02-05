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
    checked: boolean


}

export default function RadioComponent({id, label, name, value, error, onChange, onBlur, checked }: InputComponentProps) {

    return (
        <div className={"singleGender"}>
            <label htmlFor={id}>{label}</label>
            <input type={"radio"} name={name} id={id} value={value}  onChange={onChange}  onBlur={onBlur}
                   checked={checked}
            />
            { error && <div style={{color: "red"}}>{error}</div> }
        </div>
        )
}