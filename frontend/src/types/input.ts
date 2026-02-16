type InputElement = HTMLInputElement | HTMLTextAreaElement;
export interface UseInputReturn {
  value: string;
  handleInputChange: (event: React.ChangeEvent<InputElement>) => void;
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

export type FormTextAreaProps = Omit<
  React.ComponentProps<"textarea">,
  "value" | "onChange" | "onBlur"
> & {
  label: string;
  id: string;
  formprops: UseInputReturn;
};