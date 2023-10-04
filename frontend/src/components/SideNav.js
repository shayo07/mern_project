import { Link } from "react-router-dom"

const SideNav = () =>{
    return(
                        
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">AdminLTE 3</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">Alexander Pierce</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item menu-open">
          <a  className="nav-link active" href="#" role="button">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Products
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to='/brand' className="nav-link">
                  <i className="far fa-circle nav-icon" />
                    <p>Brands</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/category" className="nav-link">
                <i className="far fa-circle nav-icon" />
                      <p>Category</p>
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/subCategory" className="nav-link">
                <i className="far fa-circle nav-icon" />
                      <p>SubCategory</p>
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/product" className="nav-link">
                <i className="far fa-circle nav-icon" />
                      <p>Product</p>
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/item" className="nav-link">
                <i className="far fa-circle nav-icon" />
                      <p>Item</p>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item menu-open">
          <a  className="nav-link" href="#" role="button">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              POS
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to='/pos' className="nav-link">
                  <i className="far fa-circle nav-icon" />
                    <p>POS</p>
              </Link>
            </li> 
            <li className="nav-item">
              <Link to='/order' className="nav-link">
                  <i className="far fa-circle nav-icon" />
                    <p>Orders</p>
              </Link>
            </li> 
            <li className="nav-item">
              <Link to='/store' className="nav-link">
                  <i className="far fa-circle nav-icon" />
                    <p>Store</p>
              </Link>
            </li> 
            <li className="nav-item">
              <Link to='/storeTransaction' className="nav-link">
                  <i className="far fa-circle nav-icon" />
                    <p>Store Transaction</p>
              </Link>
            </li> 
          </ul>
        </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>



    )
}

export default SideNav