import { findAllUsers, findUserById, findUserByEmail, createUser } from '../repositories/user.repository.js'
import { USER_ROLES } from '../constants/index.js'

export const getAllUsersService = async () => {
    const users = await findAllUsers()
    return { payload: users }
}

export const getUserByIdService = async (id) => {
    const user = await findUserById(id)
    if (!user) {
        return { error: 'no_encontrado' }
    }
    return { payload: user }
}

export const createUserService = async (userData) => {
    const { first_name, last_name, email, password } = userData

    if (!first_name || !last_name || !email || !password) {
        return { error: 'campos_faltantes' }
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        return { error: 'email_existente' }
    }

    // El rol nunca se recibe del body: se aplica el default USER
    const newUser = await createUser({
        first_name,
        last_name,
        email,
        password,
        role: USER_ROLES.USER
    })

    return { payload: newUser }
}