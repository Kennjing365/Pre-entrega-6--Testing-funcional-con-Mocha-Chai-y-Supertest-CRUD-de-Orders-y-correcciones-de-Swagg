import { Router } from 'express'
import { getMockUsers, seedUsersController, seedOrdersController, seedDeliveriesController } from '../controllers/mock.controller.js'

const router = Router()

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Genera usuarios simulados sin guardarlos en la base
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Cantidad de usuarios a generar (entre 1 y 100)
 *     responses:
 *       200:
 *         description: Array de usuarios simulados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida (no numérica, negativa, cero, o mayor al máximo permitido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/users', getMockUsers)

/**
 * @swagger
 * /api/mocks/seed/users:
 *   post:
 *     summary: Genera e inserta usuarios de prueba reales en MongoDB
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       201:
 *         description: Cantidad de usuarios insertados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertados:
 *                   type: integer
 *                   example: 10
 *                 coleccion:
 *                   type: string
 *                   example: usuarios
 *       400:
 *         description: Cantidad inválida, o falla al insertar en MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/seed/users', seedUsersController)

/**
 * @swagger
 * /api/mocks/seed/orders:
 *   post:
 *     summary: Genera e inserta pedidos de prueba, asociados a clientes ya existentes
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       201:
 *         description: Cantidad de pedidos insertados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertados:
 *                   type: integer
 *                   example: 5
 *                 coleccion:
 *                   type: string
 *                   example: pedidos
 *       400:
 *         description: Cantidad inválida, no hay clientes disponibles para asociar, o falla al insertar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/seed/orders', seedOrdersController)

/**
 * @swagger
 * /api/mocks/seed/deliveries:
 *   post:
 *     summary: Genera e inserta entregas de prueba, asociadas a pedidos y repartidores ya existentes
 *     tags: [Deliveries]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       201:
 *         description: Cantidad de entregas insertadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertados:
 *                   type: integer
 *                   example: 3
 *                 coleccion:
 *                   type: string
 *                   example: entregas
 *       400:
 *         description: Cantidad inválida, no hay pedidos o repartidores suficientes, o falla al insertar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/seed/deliveries', seedDeliveriesController)

export default router