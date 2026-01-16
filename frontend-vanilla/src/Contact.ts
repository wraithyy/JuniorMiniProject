export type Contact = {
    firstName : string,
    lastName : string,
    email : string,
    phone? : string,
    note?: string,
    gender? : "female" | "male" |"other",
    birthDate?: string,
    city? : string,
    street?: string,
    houseNumber?: string,
    zipCode?: number,
    _id: string
}

