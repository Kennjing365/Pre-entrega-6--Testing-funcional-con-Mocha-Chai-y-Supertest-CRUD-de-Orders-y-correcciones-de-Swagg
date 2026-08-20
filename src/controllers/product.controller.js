import {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService
} from '../services/product.service.js'

const errorMap = {
    campos_faltantes: { status: 400, message: 'Faltan campos obligatorios' },
    price_invalido: { status: 400, message: 'El precio no puede ser negativo' },
    stock_invalido: { status: 400, message: 'El stock no puede ser negativo' },
    no_encontrado: { status: 404, message: 'Producto no encontrado' }
}

const handleError = (res, errorKey) => {
    const known = errorMap[errorKey] || { status: 500, message: 'Error interno del servidor' }
    return res.status(known.status).json({ status: 'error', message: known.message })
}

export const getAllProducts = async (req, res) => {
    try {
        const result = await getAllProductsService(req.query)
        return res.status(200).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const getProductById = async (req, res) => {
    try {
        const result = await getProductByIdService(req.params.id)
        if (result.error) return handleError(res, result.error)
        return res.status(200).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const createProductController = async (req, res) => {
    try {
        const result = await createProductService(req.body)
        if (result.error) return handleError(res, result.error)
        return res.status(201).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const updateProductController = async (req, res) => {
    try {
        const result = await updateProductService(req.params.id, req.body)
        if (result.error) return handleError(res, result.error)
        return res.status(200).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const result = await deleteProductService(req.params.id)
        if (result.error) return handleError(res, result.error)
        return res.status(200).json({ status: 'success', payload: result.payload })
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}