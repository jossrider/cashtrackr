import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export const db = new Sequelize(process.env.DATABASE_URL, {
  // dialectOptions: { ssl: { require: false } },
  models: [__dirname + '/../models/**/*'],
  //   define: { timestamps: false },
  logging: false,
})
