import { useContext } from "react";
import { StoreTransactionContext } from "../context/StoreTransactionContext";

export const useStoreTransContext = () => {
    const context = useContext(StoreTransactionContext)
    if(!context){
        throw Error('store trans context should be used within storetrans context provider')
    }
    return context
}
