import {createContext, useReducer} from 'react'

export const CategoryContext = createContext()

export const categoryReducer = (state, action) => {
    switch(action.type){
        case 'SET_CATEGORIES':
            return{
                category: action.payload
            }
        case 'CREATE_CATEGORIES':
            return{
                category: [action.payload, ...state.category]
            }
        case 'DELETE_CATEGORIES':
            return {
                category: state.category.filter((c) => c._id !== action.payload._id)
            }
        default:
            return{
                state
            }
    }
}

export const CategoryContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(categoryReducer, {category: null})

    return (
        <CategoryContext.Provider value={{...state, dispatch}}>
            {children}
        </CategoryContext.Provider>
    )
}