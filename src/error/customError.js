export class CustomError extends Error {
    constructor(message, statusCode, code) {
        super(message)
        this.statusCode = statusCode
        this.code = code
        this.name = this.constructor.name
    }
}

export class BadRequestError extends CustomError {
    constructor(message = 'Solicitud inválida', code = 'BAD_REQUEST') {
        super(message, 400, code)
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message = 'No autenticado', code = 'UNAUTHORIZED') {
        super(message, 401, code)
    }
}

export class ForbiddenError extends CustomError {
    constructor(message = 'Sin permisos', code = 'FORBIDDEN') {
        super(message, 403, code)
    }
}

export class NotFoundError extends CustomError {
    constructor(message = 'Recurso no encontrado', code = 'NOT_FOUND') {
        super(message, 404, code)
    }
}

export class ConflictError extends CustomError {
    constructor(message = 'Conflicto con el recurso', code = 'CONFLICT') {
        super(message, 409, code)
    }
}

export class InternalServerError extends CustomError {
    constructor(message = 'Error interno del servidor', code = 'INTERNAL_ERROR') {
        super(message, 500, code)
    }
}