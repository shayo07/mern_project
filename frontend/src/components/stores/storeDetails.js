
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"


const StoreDetails = ({str}) =>{
    const { user} = useAuthContext()
    const [cost, setCost] = useState(str.cost)
    const [price, setPrice] = useState(str.price)
    const [quantity, setQuantity] = useState(0)
    const [itemId, setItemId] = useState(str.itemId)



    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = {itemId, cost, price, quantity, updatedBy: user.user._id}
        const response = await fetch('http://localhost:4000/api/store/issue/'+str._id, {
            method: 'POST',
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

    return(
        <>
         <tr>
            <td>{str.itemId.name}</td>
            <td>{str.storeNo}</td>
            <td>{str.cost}</td>
            <td>{str.price}</td>
            <td>{str.markup}</td>
            <td>{str.quantity}</td>
            <td>{str.status}</td>
            <td>
            <button type="button" className="btn btn-sm bg-gradient-warning" data-toggle="modal" data-target={"#modal-default"+str._id} >To Front</button>
            </td>
           
       
        

        <div className="modal fade" id={"modal-default"+str._id}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Issue {str.itemId.name} To Front</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form  >
                <div className="modal-body">
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Item</label>
                                    <select className="form-control select2" style={{width: '100%'}}
                                    value={itemId}>
                                        <option>{str.itemId.name}</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>StoreNo</label>
                                    <select className="form-control select2" style={{width: '100%'}}>
                                        <option>{str.storeNo}</option>
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
export default StoreDetails