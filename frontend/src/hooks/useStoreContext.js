import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export const useStoreContext = () => {
    const context = useContext(StoreContext)
    if(!context){
        throw Error('store context should be used within StoreContext provider')
    }
    return context
}
