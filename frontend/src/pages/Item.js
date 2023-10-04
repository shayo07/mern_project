import { useAuthContext } from "../hooks/useAuthContext"
import {useItemContext} from '../hooks/useItemContext'
import { useEffect } from "react"
import ItemForm from "../components/item/itemForm"
import ItemDetails from "../components/item/itemDetails"

const Item = () => {
    const {user} = useAuthContext()
    const {item, dispatch} = useItemContext()

    useEffect(()=> {
        const getItem = async() => {
            const response = await fetch('http://localhost:4000/api/item', {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_ITEM', payload: json})
            }
        }
        if(user){
            getItem()
        }
    }, [dispatch, user])

    return(
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">Items</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Items</li>
                </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>

        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <ItemForm/>
                    </div>
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Item List</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table-responsive table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Brand</th>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Barcode</th>
                                <th>Cost</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sold</th>
                                <th>Available</th>
                                <th>Defective</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {item && Object.values(item).map((i) => (<ItemDetails item={i}/>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Brand</th>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Barcode</th>
                                <th>Cost</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sold</th>
                                <th>Available</th>
                                <th>Defective</th>
                                <th>Actions</th>
                                </tr>
                            </tfoot>
                            </table>
                        </div>
                        {/* /.card-body */}
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </section>

        </div>
    )

}

export default Item