import { useContext } from "react";
import { SubCategoryContext } from "../context/SubCategory";

const useSubCategoryContext = () => {
    const context = useContext(SubCategoryContext)
    if(!context){
        throw Error("subCategoryContext should be used within SubCategoryContextProvider")
    }

    return context
}

export default useSubCategoryContext