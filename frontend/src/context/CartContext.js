import {createContext, useReducer} from 'react'

export const CartContext = createContext()

export const cartReducer = (state, action) => {
    switch(action.type){
        case 'SET_CART':
            return{
                cart: action.payload
            }
        case 'CREATE_CART':
            return{
                cart: [action.payload, ...state.cart]
            }
        case 'DELETE_CART':
            return{
                cart: state.cart.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, {cart: null})
    return (
        <CartContext.Provider value={{...state, dispatch}}>
             {children}
         </CartContext.Provider>
    )
}