
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const INIT_CART = 'INIT_CART'
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const CHANGE_QUANTITY  = 'CHANGE_QUANTITY'

export const login = (payload) => ({type:LOGIN, payload})
export const logout = () => ({type:LOGOUT})

export const initCart = (cart) => ({type:INIT_CART, payload:cart})
export const addProduct = (id,quantity) => ({type:ADD_PRODUCT_TO_CART, id,quantity})
export const removeProduct = (id) => ({type:REMOVE_PRODUCT_FROM_CART, id})
export const changeQuantity = (id,quantity) => ({type:REMOVE_PRODUCT_FROM_CART, id, quantity})