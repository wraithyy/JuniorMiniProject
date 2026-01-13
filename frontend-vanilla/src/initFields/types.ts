export interface FieldAdapter {
  getValue: () => string;
  isValid: () => boolean;
}
