import React, { useLayoutEffect, useState } from 'react'
import './WallPart.scss'
import video from '../../assets/wallwall.jpeg'

function WallPart() {

    const [scrollPosition, setPosition] = useState(0);
    // const [seed,setSeed] = useState(null)


    function ScrollEvnt(){
      useLayoutEffect(() => {
        function updatePosition() {
          setPosition(window.scrollY);
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
      }, []);

    }
    ScrollEvnt()


    let newValue2 = (parseInt(scrollPosition > 2000 ? scrollPosition+2000 : scrollPosition / 100) /10000 ) *3 -1.44;
    // console.log(newValue2);
    
  return (
    <div className='main2'>
        
        <div  autoPlay='true' muted loop id="myVideo" style={{filter: 'brightness(70%)',transform: scrollPosition > 700 ? `scale(${newValue2*1.6})` : '',transition: 'transform 0.1s ease',backgroundImage: 'url("https://i.postimg.cc/brhxdycx/wallwall.jpg")'}}>
        {/* <img src={video} /> */}
      </div>
      <div className="txt">
        <h1>SPEND & SAVE</h1>
        <p>Save 20% when you spend more than $125</p>

        <button>Shop Now</button>
      </div>
    </div>
  )
}

export default WallPart