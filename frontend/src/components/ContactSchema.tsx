import {z} from "zod"

export const ContactSchema = z.object(
    {
            _id: z.string(),

        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.email(),
        phone: z.string().min(9).or(z.literal("")),
        note: z.string().max(1000).optional(),
        gender: z.string().nullable().optional(),
        city: z.string().optional(),
        street: z.string().optional(),
        houseNumber: z.string().optional(),
        zipCode: z.coerce.number<number>(),
        birthDate: z.string().optional(),


    }
)
//TODO dodělat gender a birthDate,