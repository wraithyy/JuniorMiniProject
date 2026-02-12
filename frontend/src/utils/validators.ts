import { z } from "zod";

export const formSchema = z.object({
  email: z.email("Zadejte platný e-mail"),
  nonEmpty: z.string().min(1, "Pole je povinné"),
});
