'use server'

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from '@/src/schemas'

type ActionStateType = { errors: string[]; success: string }

export async function register(prevState: ActionStateType, formdata: FormData) {
  const registerdata = {
    email: formdata.get('email'),
    name: formdata.get('name'),
    password: formdata.get('password'),
    password_confirmation: formdata.get('password_confirmation'),
  }
  //   Validar
  const register = RegisterSchema.safeParse(registerdata)
  //   console.log('------------------------------------------LOG')
  if (!register.success) {
    const errors = register.error.issues.map((error) => error.message)
    return { errors, success: prevState.success }
  }
  // Registrar usuario
  const url = `${process.env.API_URL}/auth/create-account`
  const req = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password,
    }),
  })
  const json = await req.json()
  if (req.status == 409) {
    const { error } = ErrorResponseSchema.parse(json)
    return { success: '', errors: [error] }
  }
  const success = SuccessSchema.parse(json)
  return { errors: [], success }
}
