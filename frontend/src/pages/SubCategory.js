import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useSubCategoryContext from "../hooks/useSubCategoryContext";
import SubCategoryForm from "../components/subCategory/subCategoryForm";
import SubCategoryDetails from "../components/subCategory/subCategoryDetails";

const SubCategory = () => {
    const {user} = useAuthContext()
    const {subCategory, dispatch} = useSubCategoryContext()
    useEffect(()=> {
        const getSubCategory = async() => {
            const response = await fetch('http://localhost:4000/api/subCategory',{
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)
            if(response.ok){
                dispatch({type: 'SET_SUBCATEGORY', payload:json})
            }
        }
        if(user){
            getSubCategory()
        }
    }, [dispatch, user])
    return(
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">SubCategory</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">SubCategory</li>
                </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>

        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <SubCategoryForm/>
                    </div>
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">SubCategory List</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Photo</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {subCategory && Object.values(subCategory).map((subcategory) => (<SubCategoryDetails subcategory={subcategory}/>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Photo</th>
                                <th>Actions</th>
                                </tr>
                            </tfoot>
                            </table>
                        </div>
                        {/* /.card-body */}
                        </div>
                        
                    </div>
                </div>
                All brand
            </div>
        </section>

        </div>

         
    )
}

export default SubCategory