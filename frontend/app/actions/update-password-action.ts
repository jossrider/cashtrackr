'use server'

import getToken from '@/src/auth/token'
import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function updatePassword(prevState: ActionStateType, formdata: FormData) {
  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formdata.get('current_password'),
    password: formdata.get('password'),
    password_confirmation: formdata.get('password_confirmation'),
  })
  if (!userPassword.success) {
    return { errors: userPassword.error.issues.map((error) => error.message), success: '' }
  }
  const token = await getToken()
  const url = `${process.env.API_URL}/auth/update-password`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: userPassword.data.current_password,
      new_password: userPassword.data.password,
    }),
  })
  const json = await req.json()
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return { errors: [error], success: '' }
  }
  const success = SuccessSchema.parse(json)
  return { errors: [], success }
}
