import React from "react";
import './Footer.scss'
import creditCardImg from '../../assets/creditcardicons.png'
import navLogo from '../../assets/navLogo3.png'
import { CiTwitter,CiFacebook ,CiLinkedin, CiInstagram  } from "react-icons/ci";

function Footer() {
  return (
    <>
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
              <div className="Logo" style={{display: 'flex',alignItems: 'center'}}>
              <img className='foot_logo' src={navLogo} alt="" />
                <h2>MANIAC GAMING</h2>
              </div>
              {/* <span className="nav_logo text-white mx-3 ">FOOD HUNTER</span> */}
              <p>Thank you for visiting our gaming e-commerce store! We offer the latest titles, accessories, and exclusive deals. Stay connected for updates and enhance your gaming experience with our unique collections. Happy gaming!</p>
              <div className="footer-social-icons">
                <a className="iconLink" href="https://www.facebook.com/foodhunter222" target="_blank" rel>
                <CiFacebook className="footerIcons" />
                </a>
                <a className="iconLink" href="https://www.twitter.com/foodhunter222/" target="_blank" rel>
                <CiTwitter className="footerIcons" />
                </a>
                <a className="iconLink" href="https://www.linkedin.com/foodhunter222/" target="_blank" rel>
                <CiLinkedin className="footerIcons" />
                </a>
                <a className="iconLink" href="https://www.instagram.com/foodhunter222/" target="_blank" rel>
                <CiInstagram className="footerIcons" />
                </a>

              </div>
            </div>
            <div className="footer-content-center">
              <h5>COMPANY</h5>
              <ul>
                <li>Home</li>
                <li>All Products</li>
                {/* <li>Delivery</li> */}
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="footer-content-right">
             <h5>GET IN TOUCH</h5>
             <ul>
                {/* <li>+91 9999999999</li> */}
                <li>gaming@maniac.com</li>
             </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ maniac-gaming.com - All Right Reserved.</p>
    </div>
    {/* <img src="large_foodure.png" alt="" /> */}
    </>
  );
}

export default Footer;