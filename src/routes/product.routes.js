import { Router } from 'express'
import {
    getAllProducts,
    getProductById,
    createProductController,
    updateProductController,
    deleteProductController
} from '../controllers/product.controller.js'

const router = Router()

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos los productos
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: onlyAvailable
 *         schema:
 *           type: string
 *           enum: ['true', 'false']
 *         description: Si es "true", devuelve solo productos con status AVAILABLE y stock mayor a 0
 *     responses:
 *       200:
 *         description: Listado de productos
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 */
router.get('/', getAllProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getProductById)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un producto
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Datos inválidos (campos faltantes, precio o stock negativo)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createProductController)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Modifica un producto
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateProductController)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteProductController)

export default router