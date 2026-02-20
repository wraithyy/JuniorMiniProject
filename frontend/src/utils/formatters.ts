export function formatDate(longFormat: string | undefined) {
  return longFormat ? longFormat.slice(0, 10) : "";
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
