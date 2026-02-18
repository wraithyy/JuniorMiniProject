export function formatDate(longFormat: string | Date | undefined) {
  const dateString = String(longFormat);
  return dateString ? dateString.slice(0, 10) : "";
}

export function formatGender(gender: string) {
  if (gender === "male") {
    return "muž";
  }
  if (gender === "female") {
    return "žena";
  }
  return "jiné";
}
