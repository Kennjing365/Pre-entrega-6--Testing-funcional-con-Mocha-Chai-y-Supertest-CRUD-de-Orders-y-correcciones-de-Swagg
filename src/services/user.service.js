import { findAllUsers, findUserById, findUserByEmail, createUser } from '../repositories/user.repository.js'
import { USER_ROLES } from '../constants/index.js'
import { ErrorDictionary } from '../error/errorDictionary.js'

export const getAllUsersService = async () => {
    return findAllUsers()
}

export const getUserByIdService = async (id) => {
    const user = await findUserById(id)
    if (!user) {
        throw ErrorDictionary.USER_NOT_FOUND()
    }
    return user
}

export const createUserService = async (userData) => {
    const { first_name, last_name, email, password } = userData

    if (!first_name || !last_name || !email || !password) {
        throw ErrorDictionary.USER_MISSING_FIELDS()
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        throw ErrorDictionary.USER_EMAIL_EXISTS()
    }

    return createUser({
        first_name,
        last_name,
        email,
        password,
        role: USER_ROLES.CLIENTE
    })
}