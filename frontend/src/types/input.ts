export interface UseInputReturn {
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setAsTouched: () => void;
  errorMsg: string;
  isValid: boolean;
}

export type FormInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  formprops: UseInputReturn;
};
