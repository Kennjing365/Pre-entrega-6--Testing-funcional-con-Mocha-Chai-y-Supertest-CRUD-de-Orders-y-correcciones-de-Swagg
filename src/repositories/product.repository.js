import { productModel } from '../models/product.model.js'

export const findAllProducts = async (filter = {}) => {
    return productModel.find(filter).select('-__v')
}

export const findProductById = async (id) => {
    return productModel.findById(id).select('-__v')
}

export const createProduct = async (productData) => {
    return productModel.create(productData)
}

export const updateProductById = async (id, updateData) => {
    return productModel.findByIdAndUpdate(id, updateData, { new: true }).select('-__v')
}

export const deleteProductById = async (id) => {
    return productModel.findByIdAndDelete(id)
}