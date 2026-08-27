import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Orders', () => {
    it('POST /api/orders crea un pedido con datos válidos', async () => {
        const userRes = await request(app).post('/api/users').send({
            first_name: 'Cliente', last_name: 'Prueba', email: 'cliente.pedido@mail.com', password: '123456'
        })
        const userId = userRes.body.payload._id

        const res = await request(app).post('/api/orders').send({
            user: userId, address: 'Av. Siempre Viva 742', priority: 'HIGH'
        })

        expect(res.status).to.equal(201)
        expect(res.body.payload).to.have.property('status', 'PENDING')
        expect(res.body.payload).to.have.property('address', 'Av. Siempre Viva 742')
    })

    it('GET /api/orders/:id consulta un pedido existente', async () => {
        const userRes = await request(app).post('/api/users').send({
            first_name: 'Cliente2', last_name: 'Prueba', email: 'cliente2@mail.com', password: '123456'
        })
        const createRes = await request(app).post('/api/orders').send({
            user: userRes.body.payload._id, address: 'Calle Falsa 123'
        })
        const orderId = createRes.body.payload._id

        const res = await request(app).get(`/api/orders/${orderId}`)
        expect(res.status).to.equal(200)
        expect(res.body.payload).to.have.property('_id', orderId)
    })

    it('GET /api/orders/:id con id inexistente responde 404', async () => {
        const res = await request(app).get('/api/orders/000000000000000000000000')
        expect(res.status).to.equal(404)
        expect(res.body.code).to.equal('ORDER_NOT_FOUND')
    })

    it('PATCH /api/orders/:id/status con estado inválido responde 400', async () => {
        const userRes = await request(app).post('/api/users').send({
            first_name: 'C3', last_name: 'P', email: 'c3@mail.com', password: '123456'
        })
        const createRes = await request(app).post('/api/orders').send({
            user: userRes.body.payload._id, address: 'Dirección X'
        })
        const orderId = createRes.body.payload._id

        const res = await request(app).patch(`/api/orders/${orderId}/status`).send({ status: 'NO_EXISTE' })
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('ORDER_INVALID_STATUS')
    })
})