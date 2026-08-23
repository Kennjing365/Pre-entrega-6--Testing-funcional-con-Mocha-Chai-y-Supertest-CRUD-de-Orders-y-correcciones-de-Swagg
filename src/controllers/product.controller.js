import {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService
} from '../services/product.service.js'

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProductsService(req.query)
        return res.status(200).json({ status: 'success', payload: products })
    } catch (error) {
        next(error)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await getProductByIdService(req.params.id)
        return res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
}

export const createProductController = async (req, res, next) => {
    try {
        const product = await createProductService(req.body)
        return res.status(201).json({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const product = await updateProductService(req.params.id, req.body)
        return res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const result = await deleteProductService(req.params.id)
        return res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        next(error)
    }
}