import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCartContext = () => {
    const context = useContext(CartContext)
    if(!context){
        throw Error('cartContext should be used within cartcontext provider')
    }
    return context
}