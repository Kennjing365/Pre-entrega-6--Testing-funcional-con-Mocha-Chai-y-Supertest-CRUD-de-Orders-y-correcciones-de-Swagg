/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66a1f2c3e4b5a6d7c8f9e0a1
 *         first_name:
 *           type: string
 *           example: Juan
 *         last_name:
 *           type: string
 *           example: Pérez
 *         email:
 *           type: string
 *           example: juan@mail.com
 *         role:
 *           type: string
 *           enum: [ADMIN, CLIENTE, REPARTIDOR]
 *           example: CLIENTE
 *
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66a1f2c3e4b5a6d7c8f9e0a2
 *         user:
 *           type: string
 *           description: ObjectId del usuario dueño del pedido
 *           example: 66a1f2c3e4b5a6d7c8f9e0a1
 *         repartidor:
 *           type: string
 *           nullable: true
 *           description: ObjectId del repartidor asignado (puede ser null)
 *         status:
 *           type: string
 *           enum: [PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED]
 *           example: PENDING
 *         priority:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *           example: MEDIUM
 *         address:
 *           type: string
 *           example: Av. Siempre Viva 742
 *
 *     Delivery:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66a1f2c3e4b5a6d7c8f9e0a3
 *         order:
 *           type: string
 *           description: ObjectId del pedido asociado
 *         repartidor:
 *           type: string
 *           description: ObjectId del repartidor asignado
 *         status:
 *           type: string
 *           enum: [PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED]
 *           example: ASSIGNED
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     OrderItem:
 *       type: object
 *       description: Producto incluido dentro de un pedido
 *       properties:
 *         product:
 *           type: string
 *           description: ObjectId del producto
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 1500
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: Zapatillas Running
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           example: 15000
 *         stock:
 *           type: integer
 *           example: 10
 *         status:
 *           type: string
 *           enum: [AVAILABLE, OUT_OF_STOCK, DISCONTINUED]
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         payload:
 *           type: object
 *           description: Contenido variable según el endpoint
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         code:
 *           type: string
 *           example: PRODUCT_NOT_FOUND
 *         message:
 *           type: string
 *           example: Producto no encontrado
 */