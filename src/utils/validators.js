import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Ungueltige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungueltige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
  company: z.string().optional(),
})

export function validateForm(schema, data) {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data, errors: null }
  }

  const errors = result.error.flatten().fieldErrors
  const formattedErrors = Object.entries(errors).reduce(
    (acc, [key, messages]) => ({
      ...acc,
      [key]: messages?.[0] ?? 'Ungueltige Eingabe',
    }),
    {}
  )

  return { success: false, data: null, errors: formattedErrors }
}
