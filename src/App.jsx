import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import AllProducts from './pages/Allproducts/Allproducts'
import SingleProductDetails from './pages/singleProductDetails/SingleProductDetails'
import Footer from './components/footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Admin from './pages/admin/Admin'
import Loader from './Loader/Loader'
import AdminAddProduct from './pages/adminAddProduct/AdminAddProduct';
import AdminAllproduct from './pages/adminAllProducts/AdminAllProduct';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './pages/protectedRout/ProtectedRout';
import { jwtDecode } from 'jwt-decode';
import ProductContext from './components/contextProvider/ProductContext';
import Cart from './pages/cart/Cart';
import Profile from './pages/profile/Profile';
import ErrorPage from './pages/errorPage/ErrorPage';
import AdminAllUsers from './pages/AdminAllUsers/AdminAllUsers';
import AdminAllOrders from './pages/adminAllOrders/AdminAllOrders';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar/Navbar';

export const userContext = createContext()

function App() {
  const [user, setUser] = useState({});  
  
  axios.defaults.withCredentials = true;  
  
  useEffect(() => {  
    axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/`)  
      .then(response => {  
        const allUsers = response.data.result.user;  
        const token = localStorage.getItem('token');  
        const decodedToken = jwtDecode(token);  
        const curUser = allUsers.find(user => user._id === decodedToken.user._id); // use find instead of filter  
        setUser(curUser);    
  
      })  
      .catch(err => console.log(err));  
  }, []); // Only run once on component mount

  

  return (
    <>

      <div className='App' id='App'>
      <div><Toaster/></div>
        <userContext.Provider value={{user,setUser}}>
          <ProductContext>
            <Router>
              {/* <Navbar karts={karts}/> */}
              <Routes>
                <Route path='/' element={<Home user={user}  />} />
                <Route path='/allproducts' element={<AllProducts user={user}  />} />
                <Route path='/allproducts/:id' element={<SingleProductDetails  />} />
                <Route path='/cart' element={<Cart  />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile  />} />
                <Route path='/errorpage' element={<ErrorPage />} />
                <Route path='/admin' element={<ProtectedRoute element={Admin} />} />
                <Route path='/adminaddproduct/:id' element={<ProtectedRoute element={AdminAddProduct} />} />
                <Route path='/adminallproducts/:id' element={<ProtectedRoute element={AdminAllproduct} />} />
                <Route path='/adminAllOrders/:id' element={<ProtectedRoute element={AdminAllOrders} />} />
                <Route path='/AdminAllUsers/:id' element={<ProtectedRoute element={AdminAllUsers} />} />
              </Routes>
            </Router>
          </ProductContext>
        </userContext.Provider>
      </div>
    </>
  )
}

export default App
