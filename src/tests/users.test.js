import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Users', () => {
    it('GET /api/users devuelve un listado', async () => {
        const res = await request(app).get('/api/users')
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal('success')
        expect(res.body.payload).to.be.an('array')
    })

    it('POST /api/users crea un usuario válido con rol CLIENTE por defecto', async () => {
        const res = await request(app).post('/api/users').send({
            first_name: 'Test', last_name: 'User', email: 'test.user@mail.com', password: '123456'
        })
        expect(res.status).to.equal(201)
        expect(res.body.payload).to.have.property('role', 'CLIENTE')
        expect(res.body.payload).to.have.property('email', 'test.user@mail.com')
    })

    it('POST /api/users con campos faltantes responde 400', async () => {
        const res = await request(app).post('/api/users').send({ email: 'incompleto@mail.com' })
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('status', 'error')
        expect(res.body).to.have.property('code', 'USER_MISSING_FIELDS')
    })

    it('POST /api/users con email duplicado responde 409', async () => {
        await request(app).post('/api/users').send({
            first_name: 'A', last_name: 'B', email: 'dup@mail.com', password: '123456'
        })
        const res = await request(app).post('/api/users').send({
            first_name: 'C', last_name: 'D', email: 'dup@mail.com', password: '123456'
        })
        expect(res.status).to.equal(409)
        expect(res.body.code).to.equal('USER_EMAIL_EXISTS')
    })
})