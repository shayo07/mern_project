import { useContext } from "react";
import {CategoryContext} from '../context/CategoryContext';

export const useCategoryContext = () => {
    const context = useContext(CategoryContext)
    if(!context){
        throw Error('usecategorycontext should only be used within category context provider')
    }
    return context
} 