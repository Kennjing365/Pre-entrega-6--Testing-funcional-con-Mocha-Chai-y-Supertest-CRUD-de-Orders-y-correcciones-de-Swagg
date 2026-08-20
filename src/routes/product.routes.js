import { Router } from 'express'
import {
    getAllProducts,
    getProductById,
    createProductController,
    updateProductController,
    deleteProductController
} from "../controllers/product.controller.js"

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProductController)
router.put('/:id', updateProductController)
router.delete('/:id', deleteProductController)

export default router