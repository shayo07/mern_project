import {createContext, useReducer} from 'react'

export const ItemContext = createContext()

export const itemReducer = (state, action) => {
    switch(action.type){
        case 'SET_ITEM':
            return{
                item: action.payload
            }
        case 'CREATE_ITEM':
            return{
                item: [action.payload, ...state.item]
            }
        case 'DELETE_ITEM':
            return{
                item: state.item.filter((b) => b._id !== action.payload._id)
            }
        default:
            return{
                state
            }
    }
}

export const ItemContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(itemReducer, {item: null})
    return(
        <ItemContext.Provider value={{...state, dispatch}}>
            {children}
        </ItemContext.Provider>
    )
}