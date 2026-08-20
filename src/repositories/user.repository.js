import { userModel } from '../models/user.model.js'

export const findAllUsers = async () => {
    return userModel.find().select('-password -__v')
}

export const findUserById = async (id) => {
    return userModel.findById(id).select('-password -__v')
}

export const findUserByEmail = async (email) => {
    return userModel.findOne({ email })
}

export const createUser = async (userData) => {
    return userModel.create(userData)
}