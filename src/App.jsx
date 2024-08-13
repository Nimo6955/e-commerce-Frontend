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

export const userContext = createContext()

function App() {
  const [user, setUser] = useState({})


  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/`)
      .then(user => {
        console.log(user.data.result.user);
        const allUsers = user.data.result.user;
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token);
        const curUser = allUsers.filter(user => user._id == decodedToken.user._id);
        setUser(curUser[0]);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>

      <div className='App' id='App'>
        <userContext.Provider value={{user,setUser}}>
          <ProductContext>
            <Router>
              <Routes>
                <Route path='/' element={<Home user={user} />} />
                <Route path='/allproducts' element={<AllProducts user={user} />} />
                <Route path='/allproducts/:id' element={<SingleProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/errorpage' element={<ErrorPage />} />
                <Route path='/admin' element={<ProtectedRoute element={Admin} />} />
                <Route path='/adminaddproduct/:id' element={<ProtectedRoute element={AdminAddProduct} />} />
                <Route path='/adminallproducts/:id' element={<ProtectedRoute element={AdminAllproduct} />} />
              </Routes>
            </Router>
          </ProductContext>
        </userContext.Provider>
      </div>
    </>
  )
}

export default App
