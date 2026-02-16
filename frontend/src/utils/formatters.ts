export const formatters = {
    birthDate: (longFormat:string) => (longFormat.slice(0,10)),
    gender: (gender: string) => {
        if (gender === 'male') {
            return 'muž';
        }
        if (gender === 'female') {
            return 'žena';
        }
        return 'jiné';
    }
}