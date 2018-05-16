import {
  REMOVE_PRODUCT_FROM_CART,
  ADD_PRODUCT_TO_CART,
  CHANGE_QUANTITY
} from './actions'

export const shoppingCart = (state = {},action) => {
  console.log(action)
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {...state, [action.id]: action.quantity + (state[action.id] || 0)}
    case REMOVE_PRODUCT_FROM_CART:
      const {[action.id]: removed, ...products} = state
      return products
    case CHANGE_QUANTITY:
      return {...state, [action.id]: action.quantity}
  }
  return state
}