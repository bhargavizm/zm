import { z } from 'zod';

export const SignUpValidationSchema = z
    .object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
       phone: z
  .string()
  .regex(/^\+[1-9]\d{6,14}$/, "Phone must include country code and be 7–15 digits"),

        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        confirmPassword: z.string().min(6, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
