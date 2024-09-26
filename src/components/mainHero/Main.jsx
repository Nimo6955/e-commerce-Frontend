import React, { useEffect, useState } from 'react';
import './Main.scss';
import frontImage from '../../assets/frontImage.png';
import frontImage2 from '../../assets/frontImage2.png';
import frontImage3 from '../../assets/frontImage3.png';
import frontImage4 from '../../assets/frontImage4.png';

function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carouselElement = document.getElementById('carouselExample');

    const handleSlideChange = (event) => {
      setCurrentIndex(event.to);
    };

    carouselElement.addEventListener('slide.bs.carousel', handleSlideChange);

    return () => {
      carouselElement.removeEventListener('slide.bs.carousel', handleSlideChange);
    };
  }, []);

  return (
    <>
      <div id="carouselExample"  className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className='main1'>
              <div className="background" data-aos="zoom-in" data-aos-duration="2500"></div>
              <div className="frontImgDiv" >
              <img loading='lazy' className='frontImage' data-aos="zoom-in" data-aos-duration="1500" src={frontImage} alt="" />
              </div>

              <div className="topDiv" data-aos="fade-down">
                <h1>SHINOBI MASK</h1>
                <p>New Upcomings On The Store</p>
                <div className="lines">

                  <div className="line"></div>
                  <div className="line2"></div>
                </div>
              </div>
              <div className="bottomDiv">
                <h3>GREEN REPTOR</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className='main2'>
              <div className="background" data-aos="zoom-in" data-aos-duration="2500"></div>
              <div className="frontImgDiv">
              <img loading='lazy' className='frontImage' data-aos="zoom-in"  src={frontImage2} alt="" />
              </div>
              <div className="bottomDiv">
                <h3>ALPHA WHITE</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className='main3'>
              <div className="background" data-aos="zoom-in" data-aos-duration="2500"></div>
              <div className="frontImgDiv">
              <img loading='lazy' className='frontImage' data-aos="zoom-in"  src={frontImage3} alt="" />
              </div>
              <div className="bottomDiv">
                <h3>WAR NINJA</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className='main4'>
              <div className="background" data-aos="zoom-in" data-aos-duration="2500"></div>
              <div className="frontImgDiv">
              <img loading='lazy' className='frontImage' data-aos="zoom-in"  src={frontImage4} alt="" />
              </div>
              <div className="bottomDiv">
                <h3>CYBER GIRL</h3>
              </div>
            </div>
          </div>
        </div>
        <button
          style={{ borderLeftColor: `${currentIndex === 0 ? '#9bf900' : currentIndex === 1 ? '#02ccfe' : currentIndex === 2 ? 'orange' : currentIndex === 3 ? 'purple' : ''}`, opacity: 1 }}
          className="carousel-control-prev"
          type="button"
          id='prevBtn'
          data-bs-target="#carouselExample"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon"  aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          style={{ borderRightColor: ` ${currentIndex === 0 ? '#9bf900' : currentIndex === 1 ? '#02ccfe' : currentIndex === 2 ? 'orange' : currentIndex === 3 ? 'purple' : ''}`, opacity: 1 }}
          className="carousel-control-next"
          type="button"
          id='nextBtn'
          data-bs-target="#carouselExample"
          data-bs-slide="next">
          <span className="carousel-control-next-icon"  aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Main;