import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

type FormTextAreaControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
} & Omit<
  React.ComponentProps<"textarea">,
  "name" | "value" | "onChange" | "onBlur"
>;

export default function FormTextAreaController<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormTextAreaControllerProps<T>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <textarea
        className="form-control"
        id={field.name}
        {...inputProps}
        {...field}
      />
      <div className="control-error">{fieldState.error && <p>{fieldState.error.message}</p>}</div>
    </div>
  );
}
