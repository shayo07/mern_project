import { useEffect, useState } from "react";
import {useStoreContext} from '../hooks/useStoreContext';
import {useAuthContext} from '../hooks/useAuthContext';
import StoreDetails from "../components/stores/storeDetails";

const Store = () => {
    const {user} = useAuthContext()
    const {store, dispatch} = useStoreContext()
    const [item, setItem] = useState([])
    const [storeData, setStoreData] = useState([])
    const [itemId, setItemId] = useState('')
    const [storeNo, setStoreNo] = useState('')
    const [storeId, setStoreId] = useState('')
    const [cost, setCost] = useState(0)
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchStore = async () => {
            const response = await fetch('http://localhost:4000/api/store', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const response1 = await fetch('http://localhost:4000/api/item', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            const json1 = await response1.json()
            if(response.ok){dispatch({type: 'SET_STORE', payload:json})}
            if(response.ok){setStoreData(json)}
            if(response.ok){setItem(json1)}
        }
        if(user){
            fetchStore()
        }
    }, [dispatch, user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('you must log in')
            return
        }
        const formdata = {itemId, storeNo, cost, price, quantity ,createdBy:user.user._id}
        if(storeNo == ''){
            const response = await fetch('http://localhost:4000/api/store', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json1 = await response.json()
        if(response.ok){
            dispatch({ type: 'CREATE_STORE', payload: json1 })
        }
        }else{
           const response1 = await fetch('http://localhost:4000/api/store/'+storeId, {
            method: 'PATCH',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json1 = await response1.json()
        if(!response1.ok){
            setError(json1.error)
            setEmptyFields(json1.emptyFields)
        }
        if(response1.ok){
            setCost('')
            setPrice('')
            setStoreNo('')
            setItemId('')
            setStoreId('')
            setError(null)
            setEmptyFields([])
            
        }
        }
        
        
    }

    return(
        <div className="content-wrapper">
            <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">Stores</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Stores</li>
                </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
                {/* Content Header (Page header) */}
            <div className="content-header">
            <div className="container-fluid">
                
                <section className="content">
                <div className="container-fluid">
                <div className="row">
                    
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Stores</h3>
                            <div className="card-tools">
                            <button type="button" className="btn btn-sm bg-gradient-primary" data-toggle="modal" data-target={"#modal-recieveStore"} >Recieve Stores</button>
                            </div>
                        </div>
                        
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Item</th>
                                <th>Store</th>
                                <th>Cost</th>
                                <th>Price</th>
                                <th>Markup</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Issue</th>
                                </tr>
                            </thead>
                            <tbody>
                            {store && Object.values(store).map((store) => (<StoreDetails str={store}/>))}
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Item</th>
                                <th>Store</th>
                                <th>Cost</th>
                                <th>Price</th>
                                <th>Markup</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Issue</th>
                                </tr>
                            </tfoot>
                            </table>
                        </div>
                        {/* /.card-body */}
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="modal fade" id={"modal-recieveStore"}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Recieve Store Item</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Item</label>
                                    <select className="form-control select2" style={{width: '100%'}}
                                    value={itemId}
                                    onChange= {(e) => setItemId(e.target.value )}>
                                        <option>--Item--</option>
                                        {item.map((itm) => <option value={itm._id} >{itm.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>StoreNo</label>
                                    <select className="form-control select2" style={{width: '100%'}}
                                    value={storeNo}
                                    onChange= {(e) => (setStoreNo(e.target.value ), setStoreId(e.target.value))}>
                                        <option>--Item--</option>
                                        {storeData.map((str) => <option value={str._id}>{str.storeNo}</option>)}
                                    </select>
                                </div>
                                </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Cost</label>
                                    <input type="number"
                                        className="form-control"
                                        placeholder={emptyFields.includes('cost') ? 'Cost': '' }
                                            onChange={(e) => setCost(e.target.value)}
                                            value={cost}/>
                                </div>
                                <div className="form-group col-6">
                                    <label>Price</label>
                                    <input type="number"
                                        className="form-control"
                                        placeholder={emptyFields.includes('price') ? 'price': '' }
                                            onChange={(e) => setPrice(e.target.value)}
                                            value={price}/>
                                </div>
                                </div>
                                <div className="form-group col-6">
                                    <label>Quantity</label>
                                    <input type="number"
                                        className="form-control"
                                        placeholder={emptyFields.includes('quantity') ? 'quantity': '' }
                                            onChange={(e) => setQuantity(e.target.value)}
                                            value={quantity}/>
                                </div>
                                
                               
                        </div>
                        <div className="card-footer">
                        <button className="btn btn-primary" onClick={handleSubmit} data-dismiss="modal">Submit</button>
                                {error && <div>
                                    {error}
                                    </div>}
                        </div>
                        </form>
                    </div>
                    
                </div>
                
                </div>
                {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
            </div>



        </section>
            </div>{/* /.container-fluid */}
            </div>

        
        

            
        </div>
    )
}

export default Store