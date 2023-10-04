import { useAuthContext } from "../../hooks/useAuthContext"
import { useProductContext } from "../../hooks/useProductContext"
import { useState, useEffect } from "react"

const ProductDetails = ({product}) =>{
    const { dispatch } = useProductContext()
    const { user} = useAuthContext()
    const [name, setName] = useState(product.name)
    const [categoryId, setCategoryId] = useState(product.categoryId)
    const [subCategoryId, setSubCategoryId] = useState(product.categoryId)
    const [brandId, setBrandId] = useState(product.BrandId)
    const [description, setDescription] = useState(product.description)
    const [categoryData, setCategoryData] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])
    const [brandData, setBrandData] = useState([])


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
            const json = await response.json()
            const json1 = await response1.json()
            const json2 = await response2.json()
            if(response.ok){setCategoryData(json)}
            if(response1.ok){setSubCategoryData(json1)}
            if(response2.ok){setBrandData(json2)}
        }
        if(user){
            getCategory()
        }
    }, [])

    const handleClickDelete = async() => {
        if(!user){
            return
        }
        const response = await fetch('http://localhost:4000/api/product/'+product._id, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        dispatch({type: 'DELETE_PRODUCT', payload: json})
    }

    const handleClickEdit = async() => {
        if(!user){
            return
        }
        const update = {name, categoryId, subCategoryId, brandId, description, createdBy: user.user._id }
        await fetch('http://localhost:4000/api/product/'+product._id, {
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
            <td>{product.name}</td>
            <td>{product.categoryId.name}</td>
            <td>{product.subCategoryId.name}</td>
            <td>{product.brandId.name}</td>
            <td>{product.description}</td>
            <td>
                <button type="button" className="btn btn-sm bg-gradient-warning" data-toggle="modal" data-target={"#modal-default"+product._id} ><i className="fas fa-edit"></i></button>
                <button className="btn btn-sm bg-gradient-danger" onClick={handleClickDelete}><i className="fas fa-trash"></i></button>
            </td>
        </tr>
        

        <div className="modal fade" id={"modal-default"+product._id}>
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
                                <label>Category</label>
                                <select className="form-control select2" style={{width: '100%'}}
                                value={brandId}
                                onChange= {(e) => setBrandId(e.target.value )}>
                                    {brandData.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
export default ProductDetails