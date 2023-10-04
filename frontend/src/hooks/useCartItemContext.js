import { useContext } from "react";
import { CartItemContext } from "../context/CartItemContext";

export const useCartItemContext = () => {
    const context = useContext(CartItemContext)
    if(!context){
        throw Error('cartContext should be used within cartContextProvider')
    }
    return context
}