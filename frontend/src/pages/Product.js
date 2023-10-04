import { useEffect } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import {useProductContext} from '../hooks/useProductContext'
import ProductForm from '../components/product/productForm'
import ProductDetails from '../components/product/productDetails'


const Product = () => {
    const {user} = useAuthContext()
    const {product, dispatch} = useProductContext()

    useEffect(()=> {
        const getProduct = async() => {
            const response = await fetch('http://localhost:4000/api/product', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_PRODUCT', payload: json})
            }
        }
        if(user){
            getProduct()
        }
    }, [dispatch, user])
    return(
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">Products</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>

        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <ProductForm/>
                    </div>
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Product List</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Brand</th>
                                <th>Description</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {product && Object.values(product).map((pro) => (<ProductDetails product={pro}/>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Brand</th>
                                <th>Description</th>
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

export default Product