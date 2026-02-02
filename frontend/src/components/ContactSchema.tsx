import {z} from "zod"

export const ContactSchema = z.object(
    {

        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.email(),
        phone: z.string().optional(), //TODO Otázka: takhle to funguje, ale muselaj sem odstranit kontrolu délky stringu min(9), která způsobovala, že tato kontrola neprošla
        note: z.string().max(1000).optional(),
        city: z.string().optional(),
        street: z.string().optional(),
        houseNumber: z.string().optional(),
        zipCode: z.number().optional(),
        birthDate: z.string().optional(),


    }
)
//TODO dodělat gender a birthDate