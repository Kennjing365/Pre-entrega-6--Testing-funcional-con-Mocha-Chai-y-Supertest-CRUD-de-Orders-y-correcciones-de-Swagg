import { Router } from 'express'
import { getAllUsers, getUserById, createUserController } from '../controllers/user.controller.js'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUserController)

export default router