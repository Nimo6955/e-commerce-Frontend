import React, { useContext, useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import { Drawer } from 'antd';
import Icon from '../../assets/kart.gif'
import Product from '../product/Product';
import axios from 'axios';
import Productcontext from '../../components/contextProvider/contectState'
import { userContext } from '../../App';
import { CgProfile } from "react-icons/cg";

function Navbar() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const showDrawer = () => {
    // setOpen(true);
    navigate('/cart')
  };

  const onClose = () => {
    setOpen(false);
  };
  const context = useContext(Productcontext)
  const user = useContext(userContext)
  const { allProducts } = context;
  // console.log(allProducts); 
  const allkartsId = user?.karts

  // console.log(user);
    // const kartsProducts = allProducts?.filter(products => products._id == user.karts);
    const kartsProducts = allkartsId?.map(kartId => allProducts?.find(product => product?._id === kartId));
    // console.log(kartsProducts);

    const routToAccessories = () => {
        navigate('/allproducts', {state: 'All'})
    }
        const routToControllers = () => {
        navigate('/allproducts', {state: 'Controller'})
    }
        const routToGames = () => {
        navigate('/allproducts', {state: 'Games'})
    }

  return (
    <>
      <div className="Navbar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              <li className="hover-link">
                <p onClick={routToAccessories} className="link" >All products</p>
              </li>
              <li className="hover-link">
                <p onClick={routToControllers} className="link">Controllers</p>
              </li>
              <li className="hover-link">
                <p onClick={routToGames} className="link" >Games</p>
              </li>
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">gaming</h1>
            </Link>
          </div>
          <div className="nav-right">
            <div className="nav-cartNav hover-link" >
              <img src={Icon} className="iconNav" onClick={showDrawer} />
              <span className="cart-count center">99+</span>
            </div>
              <CgProfile onClick={() => navigate('/profile')} className='profileIcon' style={{marginBlock: 'auto'}} />
          </div>
        </div>
      </div>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        { kartsProducts?.map((product ) =>  <Product  key={product?._id} user={user} product={product}/> ) }
      </Drawer>
    </>
  )
}

export default Navbar