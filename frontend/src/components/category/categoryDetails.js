import { useCategoryContext } from "../../hooks/useCategoryContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"

const CategoryDetails = ({category}) =>{
    const { dispatch } = useCategoryContext()
    const { user} = useAuthContext()
    const [name, setName] = useState(category.name)
    const [description, setDescription] = useState(category.description)
    const [photo, setPhoto] = useState('')

    const handleClickDelete = async() => {
        if(!user){
            return
        }
        const response = await fetch('http://localhost:4000/api/category/'+category._id, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        dispatch({type: 'DELETE_CATEGORIES', payload: json})
    }

    const handleClickEdit = async() => {
        if(!user){
            return
        }
        const update = {name, description, photo: category.photo}
        await fetch('http://localhost:4000/api/category/'+category._id, {
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
        <td>{category.name}</td>
        <td>{category.code}</td>
        <td>{category.description}</td>
        <td> <img src={category.photo}/></td>
        <th>
        <button type="button" className="btn btn-sm bg-gradient-warning" data-toggle="modal" data-target={"#modal-default"+category._id} ><i className="fas fa-edit"></i></button>
            <button className="btn btn-sm bg-gradient-danger" onClick={handleClickDelete}><i className="fas fa-trash"></i></button>
        </th>
        </tr>
        

        <div className="modal fade" id={"modal-default"+category._id}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Default Modal</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form onSubmit={handleClickEdit} >
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
                                <label>Description</label>
                                <input type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputFile">Image</label>
                                <div className="input-group">
                                <div className="custom-file">
                                    <input type="file"
                                    className="custom-file-input"
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
export default CategoryDetails