import RadioComponent from "./RadioComponent.tsx";
import {useFormContext} from "react-hook-form";

type RadioGroupProps = {
    options: Array<any>,
    value?: string,
    name: string,


}

export default function RadioGroup({options, name }: RadioGroupProps) {

    const {control, formState: {errors}} = useFormContext()
    return (
        <>
            {options.map(option => (
                <RadioComponent key={option.value} id={option.value} label={option.label} name={option.name} value={option.value}

                                checked={option.value===control._formValues[name]}
                />
            )
            )}
            { errors[name] && <div style={{color: "red"}}>{errors[name]?.message as string}</div> }
        </>
    )
}