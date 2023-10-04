import { useEffect, useState } from "react"
import {useAuthContext} from '../hooks/useAuthContext'
import {useCartContext} from '../hooks/useCartContext'
import {useCartItemContext} from '../hooks/useCartItemContext'
const Pos = () => {
    const {user} = useAuthContext()
    const {cartItem, dispatch} = useCartItemContext()
    const [items, setItems] = useState([])
    
    useEffect(() => {
        const getInfo1 = async () => {
            const response1 = await fetch('http://localhost:4000/api/cartItem',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const response = await fetch('http://localhost:4000/api/cartItem/search/ite', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            const json1 = await response1.json()
            const json = await response.json()
            if(response1.ok){dispatch({type: 'SET_CARTITEM', payload: json1})}
            if(response.ok){
                setItems(json)
            }
        }
        if(user){
            getInfo1()
            }
    }, [dispatch, user])

    const handleCart = async () => {
        const update = {name, description, photo:brand.photo}
        await fetch('http://localhost:4000/api/brand/'+brand._id, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
    }

    return(
        <div className="content-wrapper">
                {/* Content Header (Page header) */}
            <div className="content-header">
            <div className="container-fluid">
                
                <section className="content">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                    <form action="simple-results.html">
                    <div className="input-group">
                        <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here"/>
                    </div>
                    </form>
                    <br></br>
                    <div className="card">
                        <div className= "card-body">
                            {items && Object.values(items).map((item)=> (
                                <button type="button" class="btn btn-block btn-outline-primary btn-xs" onClick={handleCart}>{item.name}</button>
                            ))}
                        </div>
                    </div>

                    </div>
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Cart Items</h3>
                            <div className="card-tools">
                            CartNo: 00000
                        </div>
                        </div>
                        
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Discount</th>
                                <th>Net</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem && Object.values(cartItem).map((item) => 
                                (<tr>
                                    <td>{item.itemId.name}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.netPrice}</td>
                                    <td>
                                    <button className="btn btn-sm bg-gradient-danger"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>))}
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Discount</th>
                                <th>Net</th>
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
            </div>{/* /.container-fluid */}
            </div>

        
        

            
        </div>
    )
}

export default Pos