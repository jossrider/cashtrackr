import { Request, Response, NextFunction } from 'express'
import { param, validationResult, body } from 'express-validator'
import Expense from '../models/Expense'

declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
  await body('name').notEmpty().withMessage('El nombre del gasto no puede ir vacio!!').trim().run(req)
  await body('amount')
    .notEmpty()
    .withMessage('El monto del gasto no puede ir vacio!!')
    .isNumeric()
    .withMessage('El monto debe ser un monto valido!!')
    .custom((value) => value > 0)
    .withMessage('El gasto debe ser mayor a 0 (cero)!!')
    .run(req)
  next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
  await param('expenseId')
    .isInt()
    .custom((val) => val > 0)
    .withMessage('IDd no válido!!')
    .run(req)
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const validateExpenseExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { expenseId } = req.params
    const expense = await Expense.findByPk(expenseId)
    if (!expense) {
      const error = new Error(`No se encontro el gasto Nro: ${expenseId}!!`)
      return res.status(404).json({ error: error.message })
    }
    req.expense = expense
    next()
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: 'Hubo un error!!' })
  }
}

export const belognsToBudget = async (req: Request, res: Response, next: NextFunction) => {
  if (req.budget.id !== req.expense.budgetId) {
    const error = new Error('Acción no válida!!')
    return res.status(403).json({ error: error.message })
  }
  next()
}
