import {createContext, useReducer} from 'react'

export const StoreTransactionContext = createContext()

export const stroreTransactionReducer = (state, action) => {
    switch(action.type){
        case 'SET_STORETRANS':
            return{
                storeTrans: action.payload
            }
        case 'CREATE_STORETRANS':
            return{
                storeTrans: [action.payload, ...state.storeTrans]
            }
        case 'DELETE_STORETRANS':
            return{
                storeTrans: state.storeTrans.filter((s) => s._id !==action.payload._id) 
            }
        default:
            return state
    }
}

export const StoreTransactionContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(stroreTransactionReducer, {storeTrans: null})
    return (
        <StoreTransactionContext.Provider value={{...state, dispatch}}>
            {children}
        </StoreTransactionContext.Provider>
    )
}