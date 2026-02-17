type InputElement = HTMLInputElement | HTMLTextAreaElement;
export interface UseInputReturn {
  value: string;
  handleInputChange: (event: React.ChangeEvent<InputElement>) => void;
  setAsTouched: () => void;
  errorMsg: string;
  isValid: boolean;
}
