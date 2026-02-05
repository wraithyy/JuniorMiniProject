import type {ChangeEvent} from "react";
import RadioComponent from "./RadioComponent.tsx";

type RadioGroupProps = {
    options: Array<any>,
    value?: string,

    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void,


}

export default function RadioGroup({options, onChange, onBlur, value }: RadioGroupProps) {

    return (
        <>
            {options.map(option => (
                <RadioComponent key={option.value} id={option.value} label={option.label} name={option.name} value={option.value}
                                onChange={(e) =>onChange(e)}
                                onBlur={(e) => onBlur(e)}
                                checked={option.value===value}
                />
            )
            )}
        </>
    )
}