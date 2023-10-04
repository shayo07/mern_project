import {BrandContext} from '../context/BrandContext';
import { useContext } from 'react';

export const useBrandContext = () => {
    const context = useContext(BrandContext)
    if(!context){
        throw Error('use brand context must be used inside brandcontextprovider')
    }
    return context
}