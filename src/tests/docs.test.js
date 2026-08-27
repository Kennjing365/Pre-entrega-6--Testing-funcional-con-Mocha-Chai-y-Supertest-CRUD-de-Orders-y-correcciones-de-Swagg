import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Documentación (Swagger)', () => {
    it('GET /api/docs responde 200 y sirve HTML', async () => {
        const res = await request(app).get('/api/docs/')
        expect(res.status).to.equal(200)
        expect(res.headers['content-type']).to.include('html')
    })
})