import { BadRequestError, NotFoundError, ConflictError } from './customError.js'

export const ErrorDictionary = {
    // Productos
    PRODUCT_NOT_FOUND: () => new NotFoundError('Producto no encontrado', 'PRODUCT_NOT_FOUND'),
    PRODUCT_INVALID_PRICE: () => new BadRequestError('El precio no puede ser negativo', 'PRODUCT_INVALID_PRICE'),
    PRODUCT_INVALID_STOCK: () => new BadRequestError('El stock no puede ser negativo', 'PRODUCT_INVALID_STOCK'),
    PRODUCT_MISSING_FIELDS: () => new BadRequestError('Faltan campos obligatorios del producto', 'PRODUCT_MISSING_FIELDS'),

    // Usuarios
    USER_NOT_FOUND: () => new NotFoundError('Usuario no encontrado', 'USER_NOT_FOUND'),
    USER_EMAIL_EXISTS: () => new ConflictError('El email ya está registrado', 'USER_EMAIL_EXISTS'),
    USER_MISSING_FIELDS: () => new BadRequestError('Faltan campos obligatorios del usuario', 'USER_MISSING_FIELDS'),

    // Pedidos / Entregas
    ORDER_NOT_FOUND: () => new NotFoundError('Pedido no encontrado', 'ORDER_NOT_FOUND'),
    ORDER_INVALID_STATUS: () => new BadRequestError('Estado de pedido inválido', 'ORDER_INVALID_STATUS'),
    DELIVERY_NOT_FOUND: () => new NotFoundError('Entrega no encontrada', 'DELIVERY_NOT_FOUND'),

    // Mocks
    MOCK_INVALID_QTY: () => new BadRequestError('La cantidad solicitada debe ser un número entero mayor a 0', 'MOCK_INVALID_QTY'),
    MOCK_QTY_TOO_LARGE: () => new BadRequestError('La cantidad solicitada excede el máximo permitido (100)', 'MOCK_QTY_TOO_LARGE'),
    MOCK_NO_CLIENTS_AVAILABLE: () => new BadRequestError('No hay usuarios con rol CLIENTE disponibles para asociar pedidos', 'MOCK_NO_CLIENTS_AVAILABLE'),
    MOCK_NO_RELATED_DATA: () => new BadRequestError('No hay pedidos o repartidores suficientes para generar entregas', 'MOCK_NO_RELATED_DATA'),
    MOCK_SEED_FAILED: () => new BadRequestError('Ocurrió un error al insertar los datos de prueba en la base', 'MOCK_SEED_FAILED')
}