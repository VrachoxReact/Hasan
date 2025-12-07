import { z } from "zod";

/**
 * Zod Schemas for Produkt Auto
 * Centralized validation with Croatian error messages
 */

// Contact Form Schema
export const contactFormSchema = z.object({
  ime: z
    .string()
    .min(1, "Ovo polje je obavezno")
    .min(2, "Ime mora imati minimalno 2 znaka")
    .max(100, "Ime ne smije biti duže od 100 znakova"),
  email: z.string().min(1, "Ovo polje je obavezno").email("Email nije valjan"),
  telefon: z
    .string()
    .min(1, "Ovo polje je obavezno")
    .regex(/^\+?[\d\s-]{9,}$/, "Broj telefona nije valjan"),
  budzet: z.string().optional(),
  poruka: z
    .string()
    .min(1, "Ovo polje je obavezno")
    .min(10, "Poruka mora imati minimalno 10 znakova")
    .max(1000, "Poruka ne smije biti duža od 1000 znakova"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Vehicle Inquiry Form Schema (for vehicle detail page)
export const vehicleInquirySchema = z.object({
  ime: z
    .string()
    .min(1, "Ovo polje je obavezno")
    .min(2, "Ime mora imati minimalno 2 znaka")
    .max(100, "Ime ne smije biti duže od 100 znakova"),
  email: z.string().min(1, "Ovo polje je obavezno").email("Email nije valjan"),
  telefon: z
    .string()
    .min(1, "Ovo polje je obavezno")
    .regex(/^\+?[\d\s-]{9,}$/, "Broj telefona nije valjan"),
  poruka: z
    .string()
    .min(10, "Poruka mora imati minimalno 10 znakova")
    .max(1000, "Poruka ne smije biti duža od 1000 znakova"),
});

export type VehicleInquiryData = z.infer<typeof vehicleInquirySchema>;

// Vozilo Data Schema (for validating vozila.json)
export const voziloSchema = z.object({
  id: z.string().min(1, "ID je obavezan"),
  marka: z.string().min(1, "Marka je obavezna"),
  model: z.string().min(1, "Model je obavezan"),
  godina: z
    .number()
    .int()
    .min(1990, "Godina mora biti između 1990 i 2025")
    .max(2025, "Godina mora biti između 1990 i 2025"),
  cijena: z.number().positive("Cijena mora biti pozitivan broj"),
  staracijena: z.number().positive().optional(),
  kilometraza: z.number().nonnegative("Kilometraža ne može biti negativna"),
  gorivo: z.enum(["benzin", "dizel", "hibrid", "elektricni"], {
    message: "Nevaljan tip goriva",
  }),
  mjenjac: z.enum(["rucni", "automatski"], {
    message: "Nevaljan tip mjenjača",
  }),
  snaga: z.number().positive("Snaga mora biti pozitivan broj"),
  boja: z.string().min(1, "Boja je obavezna"),
  opis: z.string().min(10, "Opis mora imati minimalno 10 znakova"),
  slike: z
    .array(z.string().url("Svaka slika mora biti valjani URL"))
    .min(1, "Vozilo mora imati minimalno jednu sliku"),
  istaknuto: z.boolean(),
  ekskluzivno: z.boolean().optional(),
  datumObjave: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Datum mora biti u formatu YYYY-MM-DD"),
  karakteristike: z
    .array(z.string())
    .min(1, "Vozilo mora imati minimalno jednu karakteristiku"),
});

export type VoziloValidated = z.infer<typeof voziloSchema>;

// Helper function to validate vozila array
export function validateVozila(data: unknown[]): {
  valid: VoziloValidated[];
  errors: Array<{ index: number; error: string }>;
} {
  const valid: VoziloValidated[] = [];
  const errors: Array<{ index: number; error: string }> = [];

  data.forEach((item, index) => {
    const result = voziloSchema.safeParse(item);
    if (result.success) {
      valid.push(result.data);
    } else {
      const errorMessages = result.error.issues
        .map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      errors.push({ index, error: errorMessages });
    }
  });

  return { valid, errors };
}
