import { useAuthContext } from "../../hooks/useAuthContext"
import { useProductContext } from "../../hooks/useProductContext"
import { useState, useEffect } from "react"

const ItemDetails = ({item}) =>{
    const { dispatch } = useProductContext()
    const { user} = useAuthContext()
    const [name, setName] = useState(item.name)
    const [sku, setSku] = useState(item.sku)
    const [barcode, setBarcode] = useState(item.barcode)
    const [categoryId, setCategoryId] = useState(item.categoryId)
    const [subCategoryId, setSubCategoryId] = useState(item.subCategoryId)
    const [brandId, setBrandId] = useState(item.brandId)
    const [productId, setProductId] = useState(item.productId)
    const [categoryData, setCategoryData] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])
    const [brandData, setBrandData] = useState([])
    const [productData, setProductData] = useState([])


    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch('http://localhost:4000/api/category',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const response1 = await fetch('http://localhost:4000/api/subCategory',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const response2 = await fetch('http://localhost:4000/api/brand',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const response3 = await fetch('http://localhost:4000/api/product',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            const json1 = await response1.json()
            const json2 = await response2.json()
            const json3 = await response3.json()

            if(response.ok){setCategoryData(json)}
            if(response1.ok){setSubCategoryData(json1)}
            if(response2.ok){setBrandData(json2)}
            if(response3.ok){setProductData(json3)}
        }
        if(user){
            getCategory()
        }
    }, [])

    const handleClickDelete = async() => {
        if(!user){
            return
        }
        const response = await fetch('http://localhost:4000/api/item/'+item._id, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const jsond = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_ITEM', payload: jsond})
        }
        
    }

    const handleClickEdit = async() => {
        if(!user){
            return
        }
        const update = {name, categoryId, subCategoryId, brandId, productId, sku, barcode, updatedBy: user.user._id }
        await fetch('http://localhost:4000/api/item/'+item._id, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })  
    }
    

    return(
        <>
        <tr>
            <td>{item.name}</td>
            <td>{item.categoryId.name}</td>
            <td>{item.subCategoryId.name}</td>
            <td>{item.brandId.name}</td>
            <td>{item.productId.name}</td>
            <td>{item.sku}</td>
            <td>{item.barcode}</td>
            <td>{item.cost}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.sold}</td>
            <td>{item.available}</td>
            <td>{item.defective}</td>
            <td>
                <button type="button" className="btn btn-sm bg-gradient-warning" data-toggle="modal" data-target={"#modal-default"+item._id} ><i className="fas fa-edit"></i></button>
                <button className="btn btn-sm bg-gradient-danger" onClick={handleClickDelete}><i className="fas fa-trash"></i></button>
            </td>
        </tr>
        

        <div className="modal fade" id={"modal-default"+item._id}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Default Modal</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form onSubmit={handleClickEdit} action="/subCategory">
                <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control select2" style={{width: '100%'}}
                                value={categoryId}
                                onChange= {(e) => setCategoryId(e.target.value )}>
                                    {categoryData.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>SubCategory</label>
                                <select className="form-control select2" style={{width: '100%'}}
                                value={subCategoryId}
                                onChange= {(e) => setSubCategoryId(e.target.value )}>
                                    {subCategoryData.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Brand</label>
                                <select className="form-control select2" style={{width: '100%'}}
                                value={brandId}
                                onChange= {(e) => setBrandId(e.target.value )}>
                                    {brandData.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Product</label>
                                <select className="form-control select2" style={{width: '100%'}}
                                value={productId}
                                onChange= {(e) => setProductId(e.target.value )}>
                                    {productData.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>SKU</label>
                                <input type="text"
                                className="form-control"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                    />
                            </div>

                            <div className="form-group">
                                <label>Barcode</label>
                                <input type="text"
                                className="form-control"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                                    />
                            </div>
                            
                             
                </div>
                <div className="modal-footer justify-content-between">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleClickEdit} data-dismiss="modal">Save changes</button>
                </div>
                </form>
                </div>
                {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
            </div>
        </>
    )
}
export default ItemDetails