import { json, type Request, type Response } from 'express'
import Budget from '../models/Budget'
import Expense from '../models/Expense'

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
        // limit: 2
      })
      return res.json(budgets)
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: 'Hubo un error!!' })
    }
  }
  
  static create = async (req: Request, res: Response) => {
    try {
      const budget = await Budget.create(req.body)
      budget.userId = req.user.id
      await budget.save()
      res.status(201).json('Presupuesto creado!!')
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: 'Hubo un error!!' })
    }
  }
  
  static getById = async (req: Request, res: Response) => {
    const budget = await Budget.findByPk(req.budget.id, { include: [Expense] })
    return res.json(budget)
  }
  
  static updateById = async (req: Request, res: Response) => {
    // Escribir los cambios del body
    await req.budget.update(req.body)
    res.json('Presupuesto Actualizado!!')
  }
  
  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy()
    res.json('Presupuesto Borrado!!')
  }
}
