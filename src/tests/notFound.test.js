import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Ruta inexistente', () => {
    it('GET a una ruta no definida responde 404', async () => {
        const res = await request(app).get('/api/no-existe')
        expect(res.status).to.equal(404)
        expect(res.body.code).to.equal('ROUTE_NOT_FOUND')
    })
})