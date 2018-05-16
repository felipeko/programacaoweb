
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const CHANGE_QUANTITY  = 'CHANGE_QUANTITY'

export const addProduct = (id,quantity) => ({type:ADD_PRODUCT_TO_CART, id,quantity})
export const removeProduct = (id) => ({type:REMOVE_PRODUCT_FROM_CART, id})
export const changeQuantity = (id,quantity) => ({type:REMOVE_PRODUCT_FROM_CART, id, quantity})