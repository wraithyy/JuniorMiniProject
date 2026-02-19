import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import FormInput from "../inputs/FormInput";

type FormInputControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
} & Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "onChange" | "onBlur"
>;

export default function FormInputController<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  ...inputProps
}: FormInputControllerProps<T>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <FormInput
      errorMsg={fieldState.error?.message}
      field={field}
      label={label}
      type={type}
      {...inputProps}
    />
  );
}
