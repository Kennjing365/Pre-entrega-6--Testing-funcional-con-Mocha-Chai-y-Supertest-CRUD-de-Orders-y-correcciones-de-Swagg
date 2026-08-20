import { getAllUsersService, getUserByIdService, createUserService } from '../services/user.service.js'

const errorMap = {
    campos_faltantes: { status: 400, message: 'Faltan campos obligatorios' },
    email_existente: { status: 409, message: 'El email ya está registrado' },
    no_encontrado: { status: 404, message: 'Usuario no encontrado' }
}

const handleError = (res, errorKey) => {
    const known = errorMap[errorKey] || { status: 500, message: 'Error interno del servidor' }
    return res.status(known.status).json({ status: 'error', message: known.message })
}

export const getAllUsers = async (req, res) => {
    try {
        const result = await getAllUsersService()
        return res.status(200).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const getUserById = async (req, res) => {
    try {
        const result = await getUserByIdService(req.params.id)
        if (result.error) return handleError(res, result.error)
        return res.status(200).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const createUserController = async (req, res) => {
    try {
        const result = await createUserService(req.body)
        if (result.error) return handleError(res, result.error)
        return res.status(201).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}