'use server'

import getToken from '@/src/auth/token'
import { Budget, DraftExpenseSchema, ErrorResponseSchema, Expense, SuccessSchema } from '@/src/schemas'
import { revalidatePath } from 'next/cache'

type BudgetAndExpenseId = {
  expenseId: Expense['id']
  budgetId?: Budget['id']
}

type ActionStateType = {
  errors: string[]
  success: string
}

export default async function editExpense({ budgetId, expenseId }: BudgetAndExpenseId, prevState: ActionStateType, formatData: FormData) {
  const expense = DraftExpenseSchema.safeParse({
    name: formatData.get('name'),
    amount: formatData.get('amount'),
  })
  if (!expense.success) {
    return {
      errors: expense.error.issues.map((error) => error.message),
      success: '',
    }
  }
  //   actualizar gasto
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
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
