import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import { useAuthContext } from './hooks/useAuthContext';
import { Outlet } from 'react-router-dom';

//pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Brand from './pages/Brand';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import Product from './pages/Product';
import Item from './pages/Item';
import Pos from './pages/pos';
import Order from './pages/order';
import Store from './pages/store';
import StoreTransaction from './pages/storeTransaction';

function App() {
  const {user} = useAuthContext()
  return (
    <div>
      <BrowserRouter>
      {user && <>
        <Navbar/>
      <SideNav/>
        <Outlet/>
      </>
      }
        <div className='pages'>
          <Routes>
            <Route path='/' element ={user ? <Home /> : <Navigate to="/login"/>}/>
            <Route path='/brand' element ={user ? <Brand /> : <Navigate to="/login"/>} />
            <Route path='/category' element = {user ? <Category/> : <Navigate to="/login" />} />
            <Route path='/subCategory' element = {user ? <SubCategory/> : <Navigate to="/login" />} />
            <Route path='/product' element = {user ? <Product/> : <Navigate to="/login" />} />
            <Route path='/item' element = {user ? <Item/> : <Navigate to="/login" />} />
            <Route path='/pos' element = {user ? <Pos/> : <Navigate to="/login" />} />
            <Route path='/order' element = {user ? <Order/> : <Navigate to="/login" />} />
            <Route path='/store' element = {user ? <Store/> : <Navigate to="/login" />} />
            <Route path='/storeTransaction' element = {user ? <StoreTransaction/> : <Navigate to="/login" />} />
            <Route path='/login' element ={!user ? <Login /> : <Navigate to="/"/>} />
            <Route path='/signup' element ={!user ? <Signup /> : <Navigate to="/" />}  />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
