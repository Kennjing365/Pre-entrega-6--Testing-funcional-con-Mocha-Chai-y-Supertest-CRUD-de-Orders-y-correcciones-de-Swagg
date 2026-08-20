import {
    findAllProducts,
    findProductById,
    createProduct,
    updateProductById,
    deleteProductById
} from '../repositories/product.repository.js'
import { PRODUCT_STATUS } from '../constants/index.js'

export const getAllProductsService = async ({ onlyAvailable } = {}) => {
    const filter = {}

    if (onlyAvailable === 'true') {
        filter.status = PRODUCT_STATUS.AVAILABLE
        filter.stock = { $gt: 0 }
    }

    const products = await findAllProducts(filter)
    return { payload: products }
}

export const getProductByIdService = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        return { error: 'no_encontrado' }
    }
    return { payload: product }
}

export const createProductService = async (productData) => {
    const { name, price, stock } = productData

    if (!name || price === undefined) {
        return { error: 'campos_faltantes' }
    }

    if (price < 0) {
        return { error: 'price_invalido' }
    }

    if (stock !== undefined && stock < 0) {
        return { error: 'stock_invalido' }
    }

    // Regla de negocio: si no viene stock, o viene en 0, el producto nace sin stock
    const status = (!stock || stock === 0) ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE

    const newProduct = await createProduct({ ...productData, status })
    return { payload: newProduct }
}

export const updateProductService = async (id, updateData) => {
    const product = await findProductById(id)
    if (!product) {
        return { error: 'no_encontrado' }
    }

    if (updateData.price !== undefined && updateData.price < 0) {
        return { error: 'price_invalido' }
    }

    // Regla de negocio: si el stock baja a 0, actualizar el status automáticamente
    if (updateData.stock !== undefined) {
        updateData.status = updateData.stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE
    }

    const updated = await updateProductById(id, updateData)
    return { payload: updated }
}

export const deleteProductService = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        return { error: 'no_encontrado' }
    }

    await deleteProductById(id)
    return { payload: { deleted: true } }
}