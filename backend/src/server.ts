import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'

export async function connectDB() {
  try {
    await db.authenticate()
    await db.sync()
    console.log(colors.blue.bold('BD conectada exitosamente!!'))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold('Error al conectar a la BD!!'))
  }
}

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/budgets', budgetRouter)

app.get('/',(req,res) => { res.send('Todo bien..!') })

export default app
