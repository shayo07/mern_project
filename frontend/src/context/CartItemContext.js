import {createContext, useReducer} from 'react'

export const CartItemContext = createContext()

export const cartItemReducer = (state, action) => {
    switch(action.type){
        case 'SET_CARTITEM':
            return{
                cartItem: action.payload
            }
        case 'CREATE_CARTITEM':
            return{
                cartItem: [action.payload, ...state.cartItem]
            }
        case 'DELETE_CARTITEM':
            return{
                cartItem: state.cartItem.filter((c) => c._id !== action.payload._id)
            }
        default:
            return{
                state
            }     
    }
}

export const CartItemContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartItemReducer, {cartItem: null})
    return(
        <CartItemContext.Provider value={{...state, dispatch}}>
            {children}
        </CartItemContext.Provider>
    )
}