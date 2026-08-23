import { getAllUsersService, getUserByIdService, createUserService } from '../services/user.service.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService()
        return res.status(200).json({ status: 'success', payload: users })
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id)
        return res.status(200).json({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
}

export const createUserController = async (req, res, next) => {
    try {
        const user = await createUserService(req.body)
        return res.status(201).json({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
}