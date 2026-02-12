function setMaxDate(input: HTMLInputElement) {
  // use canadian date format for formatting the date
  const dateToday = new Date().toLocaleDateString("en-CA");
  input.max = dateToday;
}

export default function initBirthDate(root: ParentNode) {
  const input = root.querySelector<HTMLInputElement>("#birthDate");
  if (!input) {
    console.warn("Birth date input (#birthDate) not found.");
    return () => "";
  }
  setMaxDate(input);
  return () => input.value;
}
