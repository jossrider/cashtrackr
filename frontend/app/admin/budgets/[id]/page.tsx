import AddExpenseButton from '@/components/expenses/AddExpenseButton'
import ModalContainer from '@/components/ui/ModalContainer'
import { getBudget } from '@/src/services/budgets'
import { formatCurrency } from '@/src/utils'
import { Metadata } from 'next'
import { formatDate } from '../../../../src/utils/index'
import ExpenseMenu from '@/components/expenses/ExpenseMenu'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Amount from '@/components/ui/Amount'
import ProgressBar from '@/components/budgets/ProgressBar'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const budget = await getBudget(id)
  return { title: `CashTrackr - ${budget.name}`, description: `CashTrackr - ${budget.name}` }
}

export default async function BudgetDetailsPage({ params }: Props) {
  const { id } = await params
  const budget = await getBudget(id)
  const totalExpense = budget.expenses.reduce((total, expense) => +expense.amount + total, 0)
  const totalAvailable = +budget.amount - totalExpense
  const percetage = +((totalExpense / +budget.amount) * 100).toFixed(1)
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-black text-4xl text-purple-950'>{budget.name}</h1>
          <p className='text-xl font-bold'>
            Administra tus {''} <span className='text-amber-500'>gastos</span>
          </p>
        </div>
        <div className='space-x-2'>
          <AddExpenseButton />
          <Link href={'/admin'} className='bg-amber-500 px-10 py-2.5 rounded-lg text-white font-bold '>
            Volver
          </Link>
        </div>
      </div>
      {budget.expenses.length ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
            <ProgressBar percenatge={percetage} />
            <div className='flex flex-col justify-center items-center md:items-start gap-2'>
              <Amount label={'Presupuesto'} amount={+budget.amount} />
              <Amount label={'Disponible'} amount={totalAvailable} />
              <Amount label={'Gastado'} amount={totalExpense} />
            </div>
          </div>
          <h1 className='font-black text-4xl text-purple-950 mt-10'>Gastos en este presupuesto</h1>
          <ul role='list' className='divide-y divide-gray-300 border shadow-lg mt-10 '>
            {budget.expenses.map((expense) => (
              <li key={expense.id} className='flex justify-between gap-x-6 p-5'>
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto space-y-2'>
                    <p className='text-2xl font-semibold text-gray-900'>{expense.name}</p>
                    <p className='text-xl font-bold text-amber-500'>{formatCurrency(+expense.amount)}</p>
                    <p className='text-gray-500  text-sm'>
                      Agregado: {''} <span className='font-bold'>{formatDate(expense.updatedAt)}</span>
                    </p>
                  </div>
                </div>
                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='text-center py-20'>No hay gastos aún!!</p>
      )}
      <ModalContainer />
    </>
  )
}
