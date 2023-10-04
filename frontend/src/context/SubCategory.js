import {createContext, useReducer} from 'react'


export const SubCategoryContext = createContext()

export const subCategoryReducer = (state, action) => {
    switch(action.type){
        case 'SET_SUBCATEGORY':
            return {
                subCategory: action.payload
            }
        case 'CREATE_SUBCATEGORY':
            return {
                subCategory: [action.payload, ...state.subCategory]
            }
        case 'DELETE_SUBCATEGORY':
            return {
                subCategory: state.subCategory.filter((s) => s._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const SubCategoryContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(subCategoryReducer, { subCategory: null})

    return(
        <SubCategoryContext.Provider value={{...state, dispatch}}>
            {children}
        </SubCategoryContext.Provider>
    )
}