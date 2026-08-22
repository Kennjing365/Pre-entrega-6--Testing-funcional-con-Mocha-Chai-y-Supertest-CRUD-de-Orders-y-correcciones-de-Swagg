import { Router } from 'express'
import { getMockUsers, seedUsersController, seedOrdersController, seedDeliveriesController } from '../controllers/mock.controller.js'

const router = Router()

router.get('/users', getMockUsers)
router.post('/seed/users', seedUsersController)
router.post('/seed/orders', seedOrdersController)
router.post('/seed/deliveries', seedDeliveriesController)

export default router