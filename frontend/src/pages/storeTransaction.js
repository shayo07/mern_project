import {useStoreTransContext} from "../hooks/useStoreTransContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect } from "react"
import StoreTransactionDetails from "../components/storeTransaction/transactionDetails"


const StoreTransaction = () => {
    const {storeTrans, dispatch} = useStoreTransContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchStoreTrans = async () => {
            const response = await fetch('http://localhost:4000/api/storeTransaction', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_STORETRANS', payload:json})
            }
        }
        if(user){
            fetchStoreTrans()
        }
    }, [dispatch, user])
    return(
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">Stores Transactions</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Stores Transactions</li>
                </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>

        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">StoreTransactions List</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Item</th>
                                <th>Store</th>
                                <th>T-Type</th>
                                <th>Transaction</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Markup</th>
                                <th>totalCost</th>
                                <th>Status</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {storeTrans && Object.values(storeTrans).map((trans) => (<StoreTransactionDetails str={trans}/>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Item</th>
                                <th>Store</th>
                                <th>T-Type</th>
                                <th>Transaction</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Markup</th>
                                <th>totalCost</th>
                                <th>Status</th>
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

export default StoreTransaction