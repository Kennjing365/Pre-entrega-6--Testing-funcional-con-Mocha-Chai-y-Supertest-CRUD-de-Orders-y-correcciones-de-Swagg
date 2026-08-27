import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Mocks', () => {
    it('GET /api/mocks/users?qty=3 genera 3 usuarios simulados sin persistir', async () => {
        const res = await request(app).get('/api/mocks/users?qty=3')
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array').with.lengthOf(3)
        expect(res.body[0]).to.have.property('role')
    })

    it('GET /api/mocks/users?qty=-5 responde 400', async () => {
        const res = await request(app).get('/api/mocks/users?qty=-5')
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('MOCK_INVALID_QTY')
    })

    it('POST /api/mocks/seed/users?qty=5 inserta usuarios reales', async () => {
        const res = await request(app).post('/api/mocks/seed/users?qty=5')
        expect(res.status).to.equal(201)
        expect(res.body).to.have.property('insertados', 5)
        expect(res.body).to.have.property('coleccion', 'usuarios')
    })

    it('POST /api/mocks/seed/orders sin clientes previos responde 400', async () => {
        const res = await request(app).post('/api/mocks/seed/orders?qty=3')
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('MOCK_NO_CLIENTS_AVAILABLE')
    })
})