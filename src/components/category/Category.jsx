import React from 'react'
import './Category.scss'
import bg1 from '../../assets/new1.jpeg'
import bg2 from '../../assets/new32.jpg'
import bg3 from '../../assets/new22.jpg'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Category() {

    const navigate = useNavigate()
    const routToAccessories = () => {
        navigate('/allproducts', {state: 'Accessories'})
    }
        const routToControllers = () => {
        navigate('/allproducts', {state: 'Controller'})
    }
        const routToConsoles = () => {
        navigate('/allproducts', {state: 'Console'})
    }
    return (
    <>
        {/* <Link to='/allproducts'> */}

        <div onClick={routToAccessories} data-aos="zoom-in">
            <div className="boxes1">
                <div className="imgBox">
                    <div className="box1 box" >
                        <img src={bg1} alt="" />

                    </div>
                </div>
            <h3>Accessories</h3>
            </div>
        </div>
        {/* </Link> */}
        <div onClick={routToControllers} data-aos="zoom-in">
            <div className="boxes1">
                <div className="imgBox">
                    <div className="box1 box" >
                        <img src={bg2} alt="" />

                    </div>
                </div>
            <h3>Controllers</h3>
            </div>

        </div>
        <div onClick={routToConsoles} data-aos="zoom-in">
            <div className="boxes1">
                <div className="imgBox">
                    <div className="box1 box" >
                        <img src={bg3} alt="" />

                    </div>
                </div>
            <h3>Consoles</h3>
            </div>

        </div>
    </>
    )
}

export default Category