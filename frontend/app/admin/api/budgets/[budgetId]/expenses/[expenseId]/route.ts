import { verifySession } from '@/src/auth/dal'
import getToken from '@/src/auth/token'

type paramsType = {
  params: Promise<{ budgetId: string; expenseId: string }>
}

export async function GET(reques: Request, { params }: paramsType) {
  await verifySession()
  const { budgetId, expenseId } = await params
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const json = await req.json()
  if (!req.ok) {
    return Response.json(json.error)
  }
  return Response.json(json)
}
