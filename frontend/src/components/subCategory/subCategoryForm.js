import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import useSubCategoryContext from "../../hooks/useSubCategoryContext"


const SubCategoryForm = () => {
    const {dispatch} = useSubCategoryContext()
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')
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
            const json = await response.json()
            if(response.ok){
                setCategory(json)
            }
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
        const formdata = {name, categoryId, description, photo, createdBy:user.user._id}
        const response = await fetch('http://localhost:4000/api/subCategory', {
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
            setPhoto('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_SUBCATEGORY', payload: json })
        }
    }
    return(
      
                <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add Products SubCategory</h3>
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
                        <label>Description</label>
                        <input type="text"
                         className="form-control"
                           placeholder={emptyFields.includes('description') ? 'description' : ''}
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Image</label>
                        <div className="input-group">
                        <div className="custom-file">
                            <input type="file"
                             className="custom-file-input"
                              placeholder={emptyFields.includes('photo') ? 'load image' : ''}
                              onChange={(e) => setPhoto(e.target.value)}
                              value={photo} />
                            <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <span className="input-group-text">Upload</span>
                        </div>
                        </div>
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

export default SubCategoryForm