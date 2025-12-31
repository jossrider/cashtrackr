import { success, z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z.email('Email no valido!!'),
    name: z.string().min(1, 'Tu nombre no puede ir vacio!!'),
    password: z.string().min(8, 'El password es muy corto, mínimo 8 caracteres!!'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, { error: 'Los passwords no son iguales!!', path: ['password_confirmation'] })

export const LoginSchema = z.object({
  email: z.email('Email no valido!!'),
  password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
})

export const TokenSchema = z.string({ error: 'Token no valido' }).min(6, { error: 'Token no valido' }).length(6, { error: 'Token no valido' })

export const ForgotPasswordSchema = z.object({
  email: z.email({ error: 'Email no válido' }),
})

export const SuccessSchema = z.string()

export const ErrorResponseSchema = z.object({ error: z.string() })

export type User = z.infer<typeof UserSchema>

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Los Passwords no son iguales',
    path: ['password_confirmation'],
  })

export const DraftBudgetSchema = z.object({
  name: z.string().min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce.number({ message: 'Cantidad no válida' }).min(1, { message: 'Cantidad no válida' }),
})

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
})

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema),
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({ expenses: true }))

export type Budget = z.infer<typeof BudgetAPIResponseSchema>

export const PasswordValidationSchema = z.string().min(1, { error: 'Password no válido!!' })

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { error: 'El nombre del gasto es obligatorio!!' }),
  amount: z.coerce.number().min(1, { error: 'Cantidad no válida' }),
})

export type Expense = z.infer<typeof ExpenseAPIResponseSchema>

export type DraftExpense = z.infer<typeof DraftExpenseSchema>

export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
    password: z.string().min(8, { message: 'El Nuevo Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Los Passwords no son iguales',
    path: ['password_confirmation'],
  })

export const ProfileFormSchema = z.object({
  name: z.string().min(1, { message: 'Tu Nombre no puede ir vacio' }),
  email: z.email({ message: 'Email no válido' }),
})
