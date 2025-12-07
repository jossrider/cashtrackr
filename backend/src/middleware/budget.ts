import type { Request, Response, NextFunction } from 'express'
import { param, validationResult, body } from 'express-validator'
import Budget from '../models/Budget'

declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
  await param('budgetId')
    .custom((value) => value > 0)
    .withMessage('ID no valido!!')
    .run(req)

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { budgetId } = req.params
    const budget = await Budget.findByPk(budgetId)
    if (!budget) {
      const error = new Error(`No se encontro el presupuesto Nro: ${budgetId}!!`)
      return res.status(404).json({ error: error.message })
    }
    req.budget = budget
    next()
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: 'Hubo un error!!' })
  }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
  await body('name').notEmpty().withMessage('El nombre del presupuesto no puede ir vacio!!').trim().run(req)
  await body('amount')
    .notEmpty()
    .withMessage('El monto del presupuesto no puede ir vacio!!')
    .isNumeric()
    .withMessage('El monto debe ser un monto valido!!')
    .custom((value) => value > 0)
    .withMessage('El presupuesto debe ser mayor a 0 (cero)!!')
    .run(req)
  next()
}

export function hasAccess(req: Request, res: Response, next: NextFunction) {
  if (req.budget.userId !== req.user.id) {
    const error = new Error('Acción no válida!')
    return res.status(401).json({ error: error.message })
  }
  next()
}
