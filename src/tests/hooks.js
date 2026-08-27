import mongoose from 'mongoose'
import { config } from '../config/env.config.js'

export const mochaHooks = {
    async beforeAll() {
        await mongoose.connect(config.mongoUri)
    },

    async afterEach() {
        const collections = mongoose.connection.collections
        for (const key in collections) {
            await collections[key].deleteMany({})
        }
    },

    async afterAll() {
        await mongoose.connection.close()
    }
}