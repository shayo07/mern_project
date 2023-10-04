import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

export const useItemContext = () => {
    const context = useContext(ItemContext)
    if(!context){
        throw Error('useItemContext should be used within ItemContextProvider')
    }
    return context
}