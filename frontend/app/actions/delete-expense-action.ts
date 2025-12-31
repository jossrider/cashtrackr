'use server'

import getToken from '@/src/auth/token'
import { Budget, ErrorResponseSchema, Expense, SuccessSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

type BudgetIdAndExpenseIdType = {
  budgetId: Budget['id']
  expenseId: Expense['id']
}

export default async function deleteExpense({ budgetId, expenseId }: BudgetIdAndExpenseIdType, prevState: ActionStateType) {
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const json = await req.json()
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return { errors: [error], success: '' }
  }
  const success = SuccessSchema.parse(json)
  return {
    errors: [],
    success,
  }
}
