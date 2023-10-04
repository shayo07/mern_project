import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useProductContext } from "../../hooks/useProductContext"


const ProductForm = () => {
    const {dispatch} = useProductContext()
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategory, setSubCategory] = useState([])
    const [subCategoryId, setsubCategoryId] = useState('')
    const [brand, setBrand] = useState([])
    const [brandId, setBrandId] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

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
            const json2= await response2.json()

            if(response.ok){ setCategory(json)}
            if(response1.ok){ setSubCategory(json1)}
            if(response2.ok){ setBrand(json2)}
        }
        if(user){
            getCategory()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('you must log in')
            return
        }
        const formdata = {name, categoryId, subCategoryId, brandId, description, createdBy:user.user._id}
        const response = await fetch('http://localhost:4000/api/product', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setName('')
            setDescription('')
            setCategoryId('')
            setsubCategoryId('')
            setBrandId('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_PRODUCT', payload: json })
        }
    }
    return(
      
                <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add Products</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                               className="form-control"
                               placeholder={emptyFields.includes('name') ? 'Brands Name': '' }
                                onChange={(e) => setName(e.target.value)}
                                value={name}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Category</label>
                        <select className="form-control select2" style={{width: '100%'}}
                         value={categoryId}
                          onChange= {(e) => setCategoryId(e.target.value )}>
                            <option>--Category--</option>
                            {category.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>SubCategory</label>
                        <select className="form-control select2" style={{width: '100%'}}
                         value={subCategoryId}
                          onChange= {(e) => setsubCategoryId(e.target.value )}>
                            <option>--SubCategory--</option>
                            {subCategory.map((cat) => <option value={cat._id} >{cat.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Brand</label>
                        <select className="form-control select2" style={{width: '100%'}}
                         value={brandId}
                          onChange= {(e) => setBrandId(e.target.value )}>
                            <option>--Brand--</option>
                            {brand.map((b) => <option value={b._id} >{b.name}</option>)}
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                         className="form-control"
                           placeholder={emptyFields.includes('description') ? 'description' : ''}
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}
                            />
                    </div>
    
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    {error && <div>
                        {error}
                        </div>}
                </form>
                </div>
           
    )
}

export default ProductForm