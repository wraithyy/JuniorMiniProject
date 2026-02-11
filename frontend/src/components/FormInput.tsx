import { FormInputProps } from "../types/input";
export default function FormInput({ label, id, hook, ...props }: FormInputProps ) {
    const { value, handleInputChange, handleInputBlur, errorMsg } = hook;
    
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className="form-control"
                value={value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                {...props}
            />
            <div className="control-error">{errorMsg && <p>{errorMsg}</p>}</div>
        </div>
    )
}