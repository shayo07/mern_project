import {createContext, useReducer} from 'react'

export const StoreContext = createContext()

export const storeReducer = (state, action) => {
    switch(action.type){
        case 'SET_STORE':
            return{
                store: action.payload
            }
        case 'CREATE_STORE':
            return{
                store: [action.payload, ...state.store]
            }
        case 'DELETE_STORE':
            return{
                store: state.store.filter((s) => s._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const StoreContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(storeReducer, {store: null})
    return(
        <StoreContext.Provider value={{...state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}