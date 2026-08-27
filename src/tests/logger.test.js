import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Logger', () => {
    it('GET /api/logger/test responde 200', async () => {
        const res = await request(app).get('/api/logger/test')
        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal('success')
    })
})