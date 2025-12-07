import request from 'supertest'
import server, { connectDB } from '../../server'
import { AuthController } from '../../controllers/AuthController'
import User from '../../models/User'
import * as authUtils from '../../utils/auth'
import * as jwtUtils from '../../utils/jwt'

/* describe('Authentication - Create Account', () => {
  it('should display validation errors when form is empty', async () => {
    const response = await request(server).post('/api/auth/create-account').send({})
    const createAccountMock = jest.spyOn(AuthController, 'createAccount')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)
    expect(response.status).not.toBe(201)
    expect(response.body.errors).not.toHaveLength(2)
    expect(createAccountMock).not.toHaveBeenCalled()
  })

  it('should return 400 status code when the email is invalid', async () => {
    const response = await request(server).post('/api/auth/create-account').send({ name: 'joss', password: 'password', email: 'not_valid_email' })
    const createAccountMock = jest.spyOn(AuthController, 'createAccount')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.status).not.toBe(201)
    expect(response.body.errors).not.toHaveLength(2)
    expect(createAccountMock).not.toHaveBeenCalled()
  })

  it('should return 400 status code when the password is less than 8 characters', async () => {
    const response = await request(server).post('/api/auth/create-account').send({ name: 'joss', password: 'passwo', email: 'test@test.com' })
    const createAccountMock = jest.spyOn(AuthController, 'createAccount')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.status).not.toBe(201)
    expect(response.body.errors).not.toHaveLength(2)
    expect(createAccountMock).not.toHaveBeenCalled()

    expect(response.body.errors[0].msg).toEqual('El password es muy corto, mínimo 8 caracteres!!')
  })

  it('should register a new user successfuly', async () => {
    const userData = { name: 'joss', password: 'password', email: 'test@test.com' }
    const response = await request(server).post('/api/auth/create-account').send(userData)
    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })

  it('should return 409 conflict when a user is already registered', async () => {
    const userData = { name: 'joss', password: 'password', email: 'test@test.com' }
    const response = await request(server).post('/api/auth/create-account').send(userData)
    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Un usuario con ese email ya existe!!')
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(201)
    expect(response.body).not.toHaveProperty('errors')
  })
}) */

/* describe('Authentication - Account confirmation with token', () => {
  it('should display error if token is empty or token is not valid', async () => {
    const response = await request(server).post('/api/auth/confirm-account').send({ token: 'not_valid' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('Token no válido!!')
  })

  it('should display error if token doesnt exist', async () => {
    const response = await request(server).post('/api/auth/confirm-account').send({ token: '123456' })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Token no válido!!')
    expect(response.status).not.toBe(200)
  })

  it('should confirm account with a valid token', async () => {
    const token = globalThis.cashTrackrConfirmationToken
    const response = await request(server).post('/api/auth/confirm-account').send({ token })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Cuenta confirmada!!')
    expect(response.status).not.toBe(401)
  })
}) */

/* describe('Authentication - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display validation errors when the form is empty', async () => {
    const response = await request(server).post('/api/auth/login')
    const loginMock = jest.spyOn(AuthController, 'login')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)
    expect(response.body.errors).not.toHaveLength(1)
    expect(loginMock).not.toHaveBeenCalled()
  })

  it('should return 400 bad request when the email is invalid', async () => {
    const response = await request(server).post('/api/auth/login').send({ password: 'password', email: 'not_valid' })
    const loginMock = jest.spyOn(AuthController, 'login')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('Email no válido!!')
    expect(response.body.errors).not.toHaveLength(2)
    expect(loginMock).not.toHaveBeenCalled()
  })

  it('should return 404 error if the user is not found', async () => {
    const response = await request(server).post('/api/auth/login').send({ password: 'password', email: 'user@test.com' })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Usuario no encontrado!!')
    expect(response.status).not.toBe(200)
  })

  it('should return 403 error if the user account is not confirmed', async () => {
    ;(jest.spyOn(User, 'findOne') as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: false,
      password: 'hashedPassword',
      email: 'user_not_conformed@test.com',
    })
    const response = await request(server).post('/api/auth/login').send({ password: 'password', email: 'user@test.com' })
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('La cuenta no ha sido confirmada!!')
    expect(response.status).not.toBe(200)
  })

  it('should return 403 error if the user account is not confirmed', async () => {
    const userData = { name: 'test', password: 'password', email: 'user@test.com' }
    await request(server).post('/api/auth/create-account').send(userData)
    const response = await request(server).post('/api/auth/login').send({ password: userData.password, email: userData.email })
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('La cuenta no ha sido confirmada!!')
    expect(response.status).not.toBe(200)
  })

  it('should return 401 error if the password is incorrect', async () => {
    const findOne = (jest.spyOn(User, 'findOne') as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: true,
      password: 'hashedPassword',
    })
    const checkPassword = jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(false)
    const response = await request(server).post('/api/auth/login').send({ password: 'wrongPassword', email: 'user@test.com' })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Password incorrecto!!')
    expect(response.status).not.toBe(200)
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(403)
    expect(findOne).toHaveBeenCalledTimes(1)
    expect(checkPassword).toHaveBeenCalledTimes(1)
  })

  it('should return a jwt', async () => {
    const findOne = (jest.spyOn(User, 'findOne') as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: true,
      password: 'hashedPassword',
    })
    const checkPassword = jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(true)
    const generateJWT = jest.spyOn(jwtUtils, 'generateJWT').mockReturnValue('jwt_token')
    const response = await request(server).post('/api/auth/login').send({ password: 'correctPassword', email: 'user@test.com' })
    expect(response.status).toBe(200)
    expect(response.body).toEqual('jwt_token')
    expect(findOne).toHaveBeenCalled()
    expect(findOne).toHaveBeenCalledTimes(1)
    expect(checkPassword).toHaveBeenCalled()
    expect(checkPassword).toHaveBeenCalledTimes(1)
    expect(checkPassword).toHaveBeenCalledWith('correctPassword', 'hashedPassword')
    expect(generateJWT).toHaveBeenCalled()
    expect(generateJWT).toHaveBeenCalledTimes(1)
    expect(generateJWT).toHaveBeenCalledWith(1)
  })
}) */

let jwt
async function authenticateUser() {
  const response = await request(server).post('/api/auth/login').send({ email: 'test@test.com', password: 'password' })
  jwt = response.body
  expect(response.status).toBe(200)
}

describe('GET /api/budgets', () => {
  beforeAll(() => {
    jest.resetAllMocks()
  })
  beforeAll(async () => {
    await authenticateUser()
  })

  it('should reject unauthenticated access to budgets without a jwt', async () => {
    const response = await request(server).get('/api/budgets')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('No autorizado!!')
  })

  it('should reject unauthenticated access to budgets without a valid jwt', async () => {
    const response = await request(server).get('/api/budgets').auth('not_valid', { type: 'bearer' })
    expect(response.status).toBe(500)
    expect(response.body.error).toBe('Token no válido!!')
  })

  it('should allow authenticated access to budgets with a valid jwt', async () => {
    const response = await request(server).get('/api/budgets').auth(jwt, { type: 'bearer' })
    expect(response.body).toHaveLength(1)
    expect(response.status).not.toBe(401)
    expect(response.body.error).not.toBe('No autorizado!!')
  })
})

describe('POST /api/budgets', () => {
  beforeAll(async () => {
    await authenticateUser()
  })

  it('should reject unauthenticated post request to budgets without a jwt', async () => {
    const response = await request(server).post('/api/budgets')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('No autorizado!!')
  })

  it('should display validation when the form is submitted with invalid data', async () => {
    const response = await request(server).post('/api/budgets').auth(jwt, { type: 'bearer' }).send({})
    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(4)
  })
})

describe('GET /api/budgets/:id', () => {
  beforeAll(async () => {
    await authenticateUser()
  })

  it('should reject unauthenticated get request to budgets id without a jwt', async () => {
    const response = await request(server).get('/api/budgets/1')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('No autorizado!!')
  })

  it('should return 400 bad request when id is not valid', async () => {
    const response = await request(server).get('/api/budgets/not_valid').auth(jwt, { type: 'bearer' })
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
    expect(response.body.errors).toBeDefined()
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no valido!!')
    expect(response.status).not.toBe(401)
    expect(response.body.error).not.toBe('No autorizado!!')
  })

  it('should return 404 not found when a budget doesnt exists', async () => {
    const response = await request(server).get('/api/budgets/30000').auth(jwt, { type: 'bearer' })
    expect(response.status).toBe(404)
    expect(response.body.error).toBe(`No se encontro el presupuesto Nro: 30000!!`)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('should return a single budget by id', async () => {
    const response = await request(server).get('/api/budgets/2').auth(jwt, { type: 'bearer' })
    expect(response.status).toBe(200)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
    expect(response.status).not.toBe(404)
  })
})

describe('PUT /api/budgets/:id', () => {
  beforeAll(async () => {
    await authenticateUser()
  })

  it('should reject unauthenticated get request to budgets id without a jwt', async () => {
    const response = await request(server).put('/api/budgets/1')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('No autorizado!!')
  })

  it('should display validations errors', async () => {
    const response = await request(server).put('/api/budgets/2').auth(jwt, { type: 'bearer' }).send({})
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(4)
  })

  it('should update a budget by id and return a success message', async () => {
    const response = await request(server).put('/api/budgets/2').auth(jwt, { type: 'bearer' }).send({ name: 'Updated Budget', amount: 600 })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Presupuesto Actualizado!!')
  })
})

describe('DELETE /api/budgets/:id', () => {
  beforeAll(async () => {
    await authenticateUser()
  })

  it('should reject unauthenticated get request to budgets id without a jwt', async () => {
    const response = await request(server).delete('/api/budgets/1')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('No autorizado!!')
  })

  it('should return 404 not found when a budget doesnt exist', async () => {
    const response = await request(server).delete('/api/budgets/25000').auth(jwt, { type: 'bearer' })
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('No se encontro el presupuesto Nro: 25000!!')
  })

  it('should delete a budget and return a success message', async () => {
    const response = await request(server).delete('/api/budgets/3').auth(jwt, { type: 'bearer' })
    expect(response.status).toBe(200)
    expect(response.body.error).toBe('Presupuesto Borrado!!')
  })
})
