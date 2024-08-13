import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import Navbar from '../../components/navbar/Navbar'
import { FaChevronRight } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import MyOrders from '../../components/myOrders/MyOrders';
import Address from '../../components/address/Address';
import { userContext } from '../../App';
import axios from 'axios';


function Profile() {

    const {user , setUser} = useContext(userContext)
    const [seed, setSeed] = useState(null)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobileNumber, setMobileNumber] = useState()
    const [gender, setGender] = useState()


    const profileRef = useRef()
    const MyOrderRef = useRef()
    const addressRef = useRef()
    const profile = useRef()
    const address = useRef()
    const myOrder = useRef()

    useEffect(() => {
        MyOrderRef.current.style.display = 'none'
        addressRef.current.style.display = 'none'
    },[])   
    
    
    const displayMyOrders = () => {
        profileRef.current.style.display = 'none'   
        addressRef.current.style.display = 'none'
        MyOrderRef.current.style.display = 'block'
        address.current.style.backgroundColor = '#263427'
        address.current.style.color = '#A1CCA5';

        myOrder.current.style.backgroundColor = '#111D13'
        myOrder.current.style.color = '#9bf900';

        profile.current.style.backgroundColor = '#263427'
        profile.current.style.color = '#A1CCA5';


        const addressIcon = document.getElementById('addressicon')
        addressIcon.style.color = '#A1CCA5'

        const myOrderTxt = document.getElementById('myOrderTxt')
        myOrderTxt.style.color = '#9bf900'
        
        const orderIcon = document.getElementById('orderIcon')
        orderIcon.style.color = '#9bf900'

        const icon = document.getElementById('profileIcon')
        icon.style.color = '#A1CCA5';
    }
    
    const displayProfile = () => {
        MyOrderRef.current.style.display = 'none'
        addressRef.current.style.display = 'none'
        profileRef.current.style.display = 'block'
        profile.current.style.backgroundColor = '#111D13'
        profile.current.style.color = '#9bf900';

        address.current.style.backgroundColor = '#263427'
        address.current.style.color = '#A1CCA5';

        myOrder.current.style.backgroundColor = '#263427'
        myOrder.current.style.color = '#A1CCA5';

        const icon = document.getElementById('profileIcon')
        icon.style.color = '#9bf900';

        const addressIcon = document.getElementById('addressicon')
        addressIcon.style.color = '#A1CCA5'

        const myOrderTxt = document.getElementById('myOrderTxt')
        myOrderTxt.style.color = '#A1CCA5'
        
        const orderIcon = document.getElementById('orderIcon')
        orderIcon.style.color = '#A1CCA5'
    }
    
    const displayAddress = () => {
        MyOrderRef.current.style.display = 'none'
        profileRef.current.style.display = 'none'
        addressRef.current.style.display = 'block'
        address.current.style.backgroundColor = '#111D13'
        address.current.style.color = '#9bf900';

        profile.current.style.backgroundColor = '#263427'
        profile.current.style.color = '#A1CCA5';

        myOrder.current.style.backgroundColor = '#263427'
        myOrder.current.style.color = '#A1CCA5';

        const icon = document.getElementById('profileIcon')
        icon.style.color = '#A1CCA5';

        const addressIcon = document.getElementById('addressicon')
        addressIcon.style.color = '#9bf900'

        const myOrderTxt = document.getElementById('myOrderTxt')
        myOrderTxt.style.color = '#A1CCA5'
        
        const orderIcon = document.getElementById('orderIcon')
        orderIcon.style.color = '#A1CCA5'

    }
    useEffect(() => {  
        if (user) {  
            setName(user.name);  
            setEmail(user.email);  
            setMobileNumber(user.mobileNumber);  
            // Set other fields as necessary...  
        }  
    }, [user]);

    async function UpdateUserInfo() {
        await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/user/updateUser/${user?._id}`, 
           {
            name: name,
            email: email,
            gender: gender,
            mobileNumber: mobileNumber,
        })
          .then(res => {
            setSeed(Math.random())
            console.log(res);
            setUser({  
                ...user, // Spread existing user properties  
                name: name || user.name, // use new name or existing one if new is empty  
                email: email || user.email, // similarly for email or other fields  
                mobileNumber: mobileNumber || user.mobileNumber,  
                gender: gender || user.gender, 
            });  
          })
          .catch(err => console.log(err))
      };

    
    return (
        <>
            <Navbar />
            <div>
                <div className="profileContainer">
                    <div className="leftPart">
                        <div className="nameContainer">
                            <img className='avatar' src="data:image/png;base64,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" alt="" />
                            <div className="greetings">
                                <p className='hello'>Hello,</p>
                                <h3 key={seed} className='name'>{user?.name}</h3>
                            </div>
                        </div>
                        <div className="accountContainer">
                            <div className="myOrders" onClick={displayMyOrders} ref={myOrder} >
                                <h5 id='myOrderTxt'>My Orders</h5><p><FaChevronRight id='orderIcon'/></p>
                            </div>
                            <hr />
                            <div className="accountSettings">
                                <div className='settingTag'>
                                <IoMdSettings  className='settingIcon' /> <h5>Account Settings</h5><p><FaChevronRight /></p>
                                </div>  
                                <div className="setingsNav">
                                <p ref={profile} className='nestedNav profile' onClick={displayProfile}> <CgProfile id='profileIcon'  className='nestedIcon profileIcon' /> <h6>Profile Information</h6></p>
                                <p ref={address} className='nestedNav' onClick={displayAddress}> <IoSettingsOutline id='addressicon' className='nestedIcon addressicon' /> <h6>Manage Address
                                </h6></p>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="rightPart" ref={profileRef}>
                        <div className="personalInfo">
                            <h3>Personal Information</h3>
                        </div>

                        <div className="rightContainer">
                            <label htmlFor="name">Name</label>
                            <input type="text" className='NameInput' id='name'value={name} onChange={(e) => setName(e.target.value)}/>
                            <label htmlFor="email">Email Address</label>
                            <input type="text" className='EmailInput' id='email'value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="phone">Mobile Number</label>
                            <input type="number" className='PhoneInput' id='phone'value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
                            <button className='updateBtn' onClick={UpdateUserInfo}>update</button>
                        </div>
                    </div>
                    <div style={{flex: '3'}} ref={MyOrderRef}>
                    <MyOrders  />
                    </div>
                    <div style={{flex: '3'}} ref={addressRef}>
                    <Address  />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile