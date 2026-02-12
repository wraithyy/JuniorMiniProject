import { Controller, useFormContext} from "react-hook-form";

type TextAreaProps = {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    rows?: number;
    required?: boolean;

}

export default function TextArea({id, name, label, placeholder, rows, required, }: TextAreaProps) {


    const {control, formState: {errors}} = useFormContext()


    return (
        <Controller name={name}
                control={control}
                render={({field}) => (
                    <>
                        <label htmlFor={id}>{label} ({field.value?.length ? field.value.length : 0}/1000)</label>
                        <textarea name={name} id={id} placeholder={placeholder} rows={rows} required={required} onBlur={field.onBlur} onChange={field.onChange} value={field.value} />
                        { errors[id] && <div style={{color: "red"}}>{errors[id]?.message as string}</div> }
                    </>
                )}

            />
    )
}