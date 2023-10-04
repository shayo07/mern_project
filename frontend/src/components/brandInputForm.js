import { useState } from "react"
import { useBrandContext } from "../hooks/useBrandContext"
import { useAuthContext } from "../hooks/useAuthContext"


const BrandInputForm = () => {
    const {dispatch} = useBrandContext()
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('you must log in')
            return
        }
        const brand = {name, description, photo, createdBy:user._id}
        const response = await fetch('http://localhost:4000/api/brand', {
            method: 'POST',
            body: JSON.stringify(brand),
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
            dispatch({ type: 'CREATE_BRANDS', payload: json })
        }
    }
    return(
      
                <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add Products Brand</h3>
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

export default BrandInputForm