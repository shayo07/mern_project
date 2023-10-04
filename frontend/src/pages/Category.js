import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import {useCategoryContext} from  "../hooks/useCategoryContext"
import CategoryInputForm from "../components/category/categoryInputForm"
import CategoryDetails from "../components/category/categoryDetails"

const Category = () => {
    const {category, dispatch} = useCategoryContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch('http://localhost:4000/api/category',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_CATEGORIES', payload: json})
            }
        }
        if(user){
            getCategory()
            }
    }, [dispatch, user])
    return(
        <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1 className="m-0">Categories</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Categories</li>
                        </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>

                <section className="content">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">

                        <CategoryInputForm/>

                    </div>
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Category List</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Category Name</th>
                                <th>Category Code</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {category && Object.values(category).map((category) => (<CategoryDetails category={category}/>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Image</th>
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

export default Category