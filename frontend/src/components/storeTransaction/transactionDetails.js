import {useStoreTransContext} from "../../hooks/useStoreTransContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"


const StoreTransactionDetails = ({str}) =>{
    const { user} = useAuthContext()
    const {dispatch} = useStoreTransContext()
    const [price, setPrice] = useState(str.price)
    const [cost, setCost] = useState(str.cost)
    const [quantity, setQuantity] = useState(str.quantity)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = {cost, price, quantity, updatedBy: user.user._id}
        const response = await fetch('http://localhost:4000/api/storeTransaction/'+str._id, {
            method: 'PATCH',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(response.ok){
            console.log('done')
        } 
    }
    const handleDelete = async () => {
        const response = await fetch('http://localhost:4000/api/storeTransaction/'+str._id, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_STORETRANS', payload:json })
        } 
    }
    return(
        <>
         <tr>
            <td>{str.itemId.name}</td>
            <td>{str.storeId.storeNo}</td>
            <td>{str.transType}</td>
            <td>{str.transNo}</td>
            <td>{str.price}</td>
            <td>{str.cost}</td>
            <td>{str.quantity}</td>
            <td>{str.markup}</td>
            <td>{str.totalCost}</td>
            <td>{str.status}</td>
            <td>
               <button className="btn btn-sm bg-gradient-danger" onClick={handleDelete}><i className="fas fa-trash"></i></button>
               <button className="btn btn-sm bg-gradient-warning" data-toggle="modal" data-target={"#modal-default"+str._id}><i className="fas fa-pen"></i></button>
            </td> 

        <div className="modal fade" id={"modal-default"+str._id}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Default Modal</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form  >
                <div className="modal-body">
                
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Item</label>
                                    <select className="form-control select2" style={{width: '100%'}}>
                                        <option>{str.itemId.name}</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>StoreNo</label>
                                    <select className="form-control select2" style={{width: '100%'}}>
                                        <option>{str.storeId.storeNo}</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>Transaction Type</label>
                                    <select className="form-control select2" style={{width: '100%'}}>
                                        <option>{str.transType}</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>Transaction Number</label>
                                    <select className="form-control select2" style={{width: '100%'}}>
                                        <option>{str.transNo}</option>
                                    </select>
                                </div>
                                </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Cost</label>
                                    <input type="number"
                                        className="form-control"
                                        value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                            />
                                </div>
                                <div className="form-group col-6">
                                    <label>Price</label>
                                    <input type="number"
                                        className="form-control"
                                        value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            />
                                </div>
                                </div>
                                <div className="form-group col-6">
                                    <label>Quantity</label>
                                    <input type="number"
                                        className="form-control"
                                        value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            />
                                </div>
                  
                </div>
                <div className="modal-footer justify-content-between">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit} data-dismiss="modal">Save changes</button>
                </div>
                </form>
                </div>
                {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
            </div>

            </tr>
        </>
    )
}
export default StoreTransactionDetails