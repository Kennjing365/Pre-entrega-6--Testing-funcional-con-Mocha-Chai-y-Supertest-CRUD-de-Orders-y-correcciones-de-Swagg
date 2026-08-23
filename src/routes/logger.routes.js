import { Router } from 'express'
import { testLoggerController } from '../controllers/logger.controller.js'

const router = Router()

/**
 * @swagger
 * /api/logger/test:
 *   get:
 *     summary: Genera un log de cada nivel (debug, http, info, warning, error, fatal). Herramienta interna de validación del sistema de logging, no representa una funcionalidad de negocio.
 *     tags: [Logger]
 *     responses:
 *       200:
 *         description: Confirmación de que se generaron los logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 */
router.get('/test', testLoggerController)

export default router