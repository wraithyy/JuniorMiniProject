export const outputFormatters = {
  gender: (gender: string) => {
    if (gender === "male") {
      return "muž";
    }
    if (gender === "female") {
      return "žena";
    }
    return "jiné";
  },
};
