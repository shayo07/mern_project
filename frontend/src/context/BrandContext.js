import { createContext, useReducer } from "react";

export const BrandContext = createContext()

export const brandReducer = (state, action) => {
    switch (action.type){
        case 'SET_BRANDS':
            return {
                brands: action.payload
            }
        case 'CREATE_BRANDS':
            return {
                brands: [action.payload, ...state.brands]
            }
        case 'DELETE_BRANDS':
            return {
                brands: state.brands.filter((b) => b._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const BrandContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(brandReducer, { brands: null})
    return(
        <BrandContext.Provider value={{...state, dispatch}}>
            { children }
        </BrandContext.Provider>
    )
}

