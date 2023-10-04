import { useEffect } from "react";
import {useBrandContext} from '../hooks/useBrandContext'
import {useAuthContext} from '../hooks/useAuthContext'
import BrandInputForm from "../components/brandInputForm";
import BrandDetails from "../components/brands/brands_details";


const Brand = () => {
    const {brands, dispatch} = useBrandContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await fetch('http://localhost:4000/api/brand', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_BRANDS', payload:json})
            }
        }
        if(user){
            fetchBrands()
        }
    }, [dispatch, user])
    return(
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">Brands</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Brands</li>
                </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>

        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <BrandInputForm/>
                    </div>
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Brand List</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                <th>Brand Name</th>
                                <th>Description</th>
                                <th>Brand Image</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands && Object.values(brands).map((brand) => (<BrandDetails brand={brand}/>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Brand Name</th>
                                <th>Description</th>
                                <th>Brand Image</th>
                                <th>Actions</th>
                                </tr>
                            </tfoot>
                            </table>
                        </div>
                        {/* /.card-body */}
                        </div>
                        
                    </div>
                </div>
                All brand
            </div>
        </section>

        </div>

         
    )
}

export default Brand