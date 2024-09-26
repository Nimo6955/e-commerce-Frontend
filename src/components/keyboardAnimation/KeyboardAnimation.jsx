import React, { useEffect, useRef, useState } from 'react';
import './KeyboardAnimation.scss';
import { gsap, ScrollTrigger } from "gsap/all";
import img1 from '../../assets/cool2/frame_0001.jpeg';
import mobileImg from '../../assets/frame_0001.png';
import img2 from '../../assets/cool2/frame_0002.jpeg';
import img3 from '../../assets/cool2/frame_0003.jpeg';
import img4 from '../../assets/cool2/frame_0004.jpeg';
import img5 from '../../assets/cool2/frame_0005.jpeg';
import img6 from '../../assets/cool2/frame_0006.jpeg';
import img7 from '../../assets/cool2/frame_0007.jpeg';
import img8 from '../../assets/cool2/frame_0008.jpeg';
import img9 from '../../assets/cool2/frame_0009.jpeg';
import img10 from '../../assets/cool2/frame_0010.jpeg';
import img11 from '../../assets/cool2/frame_0011.jpeg';
import img12 from '../../assets/cool2/frame_0012.jpeg';
import img13 from '../../assets/cool2/frame_0013.jpeg';
import img14 from '../../assets/cool2/frame_0014.jpeg';
import img15 from '../../assets/cool2/frame_0015.jpeg';
import img16 from '../../assets/cool2/frame_0016.jpeg';
import img17 from '../../assets/cool2/frame_0017.jpeg';
import img18 from '../../assets/cool2/frame_0018.jpeg';
import img19 from '../../assets/cool2/frame_0019.jpeg';
import img20 from '../../assets/cool2/frame_0020.jpeg';
import img21 from '../../assets/cool2/frame_0021.jpeg';
import img22 from '../../assets/cool2/frame_0022.jpeg';
import img23 from '../../assets/cool2/frame_0023.jpeg';
import img24 from '../../assets/cool2/frame_0024.jpeg';
import img25 from '../../assets/cool2/frame_0025.jpeg';
import img26 from '../../assets/cool2/frame_0026.jpeg';
import img27 from '../../assets/cool2/frame_0027.jpeg';
import img28 from '../../assets/cool2/frame_0028.jpeg';
import img29 from '../../assets/cool2/frame_0029.jpeg';
import img30 from '../../assets/cool2/frame_0030.jpeg';
import img31 from '../../assets/cool2/frame_0031.jpeg';
import img32 from '../../assets/cool2/frame_0032.jpeg';
import img33 from '../../assets/cool2/frame_0033.jpeg';
import img34 from '../../assets/cool2/frame_0034.jpeg';
import img35 from '../../assets/cool2/frame_0035.jpeg';
import img36 from '../../assets/cool2/frame_0036.jpeg';
import img37 from '../../assets/cool2/frame_0037.jpeg';
import img38 from '../../assets/cool2/frame_0038.jpeg';
import img39 from '../../assets/cool2/frame_0039.jpeg';
import img40 from '../../assets/cool2/frame_0040.jpeg';
import img41 from '../../assets/cool2/frame_0041.jpeg';
import img42 from '../../assets/cool2/frame_0042.jpeg';
import img43 from '../../assets/cool2/frame_0043.jpeg';
import img44 from '../../assets/cool2/frame_0044.jpeg';
import img45 from '../../assets/cool2/frame_0045.jpeg';
import img46 from '../../assets/cool2/frame_0046.jpeg';
import img47 from '../../assets/cool2/frame_0047.jpeg';
import img48 from '../../assets/cool2/frame_0048.jpeg';
import img49 from '../../assets/cool2/frame_0049.jpeg';
import img50 from '../../assets/cool2/frame_0050.jpeg';
import img51 from '../../assets/cool2/frame_0051.jpeg';
import img52 from '../../assets/cool2/frame_0052.jpeg';
import img53 from '../../assets/cool2/frame_0053.jpeg';
import img54 from '../../assets/cool2/frame_0054.jpeg';
import img55 from '../../assets/cool2/frame_0055.jpeg';
import img56 from '../../assets/cool2/frame_0056.jpeg';
import img57 from '../../assets/cool2/frame_0057.jpeg';
import img58 from '../../assets/cool2/frame_0058.jpeg';
import img59 from '../../assets/cool2/frame_0059.jpeg';
import img60 from '../../assets/cool2/frame_0060.jpeg';
import img61 from '../../assets/cool2/frame_0061.jpeg';
import img62 from '../../assets/cool2/frame_0062.jpeg';
import img63 from '../../assets/cool2/frame_0063.jpeg';
import img64 from '../../assets/cool2/frame_0064.jpeg';
import img65 from '../../assets/cool2/frame_0065.jpeg';
import img66 from '../../assets/cool2/frame_0066.jpeg';
import img67 from '../../assets/cool2/frame_0067.jpeg';
import img68 from '../../assets/cool2/frame_0068.jpeg';
import img69 from '../../assets/cool2/frame_0069.jpeg';
import img70 from '../../assets/cool2/frame_0070.jpeg';
import img71 from '../../assets/cool2/frame_0071.jpeg';
import img72 from '../../assets/cool2/frame_0072.jpeg';
import img73 from '../../assets/cool2/frame_0073.jpeg';
import img74 from '../../assets/cool2/frame_0074.jpeg';
import img75 from '../../assets/cool2/frame_0075.jpeg';
import img76 from '../../assets/cool2/frame_0076.jpeg';
import img77 from '../../assets/cool2/frame_0077.jpeg';
import img78 from '../../assets/cool2/frame_0078.jpeg';
import img79 from '../../assets/cool2/frame_0079.jpeg';
import img80 from '../../assets/cool2/frame_0080.jpeg';
import img81 from '../../assets/cool2/frame_0081.jpeg';
import img82 from '../../assets/cool2/frame_0082.jpeg';
import img83 from '../../assets/cool2/frame_0083.jpeg';
import img84 from '../../assets/cool2/frame_0084.jpeg';
import img85 from '../../assets/cool2/frame_0085.jpeg';
import img86 from '../../assets/cool2/frame_0086.jpeg';
import img87 from '../../assets/cool2/frame_0087.jpeg';
import img88 from '../../assets/cool2/frame_0088.jpeg';
import img89 from '../../assets/cool2/frame_0089.jpeg';
import img90 from '../../assets/cool2/frame_0090.jpeg';
import img91 from '../../assets/cool2/frame_0091.jpeg';
import img92 from '../../assets/cool2/frame_0092.jpeg';
import img93 from '../../assets/cool2/frame_0093.jpeg';
import img94 from '../../assets/cool2/frame_0094.jpeg';
import img95 from '../../assets/cool2/frame_0095.jpeg';
import img96 from '../../assets/cool2/frame_0096.jpeg';
import img97 from '../../assets/cool2/frame_0097.jpeg';
import img98 from '../../assets/cool2/frame_0098.jpeg';
import img99 from '../../assets/cool2/frame_0099.jpeg';
import img100 from '../../assets/cool2/frame_0100.jpeg';
import img101 from '../../assets/cool2/frame_0101.jpeg';
import img102 from '../../assets/cool2/frame_0102.jpeg';
import img103 from '../../assets/cool2/frame_0103.jpeg';
import img104 from '../../assets/cool2/frame_0104.jpeg';
import img105 from '../../assets/cool2/frame_0105.jpeg';
import img106 from '../../assets/cool2/frame_0106.jpeg';
import img107 from '../../assets/cool2/frame_0107.jpeg';
import img108 from '../../assets/cool2/frame_0108.jpeg';
import img109 from '../../assets/cool2/frame_0109.jpeg';
import img110 from '../../assets/cool2/frame_0110.jpeg';
import img111 from '../../assets/cool2/frame_0111.jpeg';
import img112 from '../../assets/cool2/frame_0112.jpeg';
import img113 from '../../assets/cool2/frame_0113.jpeg';
import img114 from '../../assets/cool2/frame_0114.jpeg';
import img115 from '../../assets/cool2/frame_0115.jpeg';
import img116 from '../../assets/cool2/frame_0116.jpeg';
import img117 from '../../assets/cool2/frame_0117.jpeg';
import img118 from '../../assets/cool2/frame_0118.jpeg';
import img119 from '../../assets/cool2/frame_0119.jpeg';
import img120 from '../../assets/cool2/frame_0120.jpeg';
import img121 from '../../assets/cool2/frame_0121.jpeg';
import img122 from '../../assets/cool2/frame_0122.jpeg';
import img123 from '../../assets/cool2/frame_0123.jpeg';
import img124 from '../../assets/cool2/frame_0124.jpeg';
import img125 from '../../assets/cool2/frame_0125.jpeg';
import img126 from '../../assets/cool2/frame_0126.jpeg';
import img127 from '../../assets/cool2/frame_0127.jpeg';
import img128 from '../../assets/cool2/frame_0128.jpeg';
import img129 from '../../assets/cool2/frame_0129.jpeg';
import img130 from '../../assets/cool2/frame_0130.jpeg';
import img131 from '../../assets/cool2/frame_0131.jpeg';
import img132 from '../../assets/cool2/frame_0132.jpeg';
import img133 from '../../assets/cool2/frame_0133.jpeg';
import img134 from '../../assets/cool2/frame_0134.jpeg';
import img135 from '../../assets/cool2/frame_0135.jpeg';
import img136 from '../../assets/cool2/frame_0136.jpeg';
import img137 from '../../assets/cool2/frame_0137.jpeg';
import img138 from '../../assets/cool2/frame_0138.jpeg';
import img139 from '../../assets/cool2/frame_0139.jpeg';
import img140 from '../../assets/cool2/frame_0140.jpeg';
import img141 from '../../assets/cool2/frame_0141.jpeg';
import img142 from '../../assets/cool2/frame_0142.jpeg';
import img143 from '../../assets/cool2/frame_0143.jpeg';
import img144 from '../../assets/cool2/frame_0144.jpeg';
import img145 from '../../assets/cool2/frame_0145.jpeg';
import img146 from '../../assets/cool2/frame_0146.jpeg';
import img147 from '../../assets/cool2/frame_0147.jpeg';
import img148 from '../../assets/cool2/frame_0148.jpeg';
import img149 from '../../assets/cool2/frame_0149.jpeg';
import img150 from '../../assets/cool2/frame_0150.jpeg';
import img151 from '../../assets/cool2/frame_0151.jpeg';
import img152 from '../../assets/cool2/frame_0152.jpeg';
import img153 from '../../assets/cool2/frame_0153.jpeg';
import img154 from '../../assets/cool2/frame_0154.jpeg';
import img155 from '../../assets/cool2/frame_0155.jpeg';
import img156 from '../../assets/cool2/frame_0156.jpeg';
import img157 from '../../assets/cool2/frame_0157.jpeg';
import img158 from '../../assets/cool2/frame_0158.jpeg';
import img159 from '../../assets/cool2/frame_0159.jpeg';
import img160 from '../../assets/cool2/frame_0160.jpeg';
import img161 from '../../assets/cool2/frame_0161.jpeg';
import img162 from '../../assets/cool2/frame_0162.jpeg';
import img163 from '../../assets/cool2/frame_0163.jpeg';
import img164 from '../../assets/cool2/frame_0164.jpeg';
import img165 from '../../assets/cool2/frame_0165.jpeg';
import img166 from '../../assets/cool2/frame_0166.jpeg';
import img167 from '../../assets/cool2/frame_0167.jpeg';
import img168 from '../../assets/cool2/frame_0168.jpeg';
import img169 from '../../assets/cool2/frame_0169.jpeg';
import img170 from '../../assets/cool2/frame_0170.jpeg';
import img171 from '../../assets/cool2/frame_0171.jpeg';
import img172 from '../../assets/cool2/frame_0172.jpeg';
import img173 from '../../assets/cool2/frame_0173.jpeg';
import img174 from '../../assets/cool2/frame_0174.jpeg';
import img175 from '../../assets/cool2/frame_0175.jpeg';
import img176 from '../../assets/cool2/frame_0176.jpeg';
import img177 from '../../assets/cool2/frame_0177.jpeg';
import img178 from '../../assets/cool2/frame_0178.jpeg';
import img179 from '../../assets/cool2/frame_0179.jpeg';
import img180 from '../../assets/cool2/frame_0180.jpeg';
import img181 from '../../assets/cool2/frame_0181.jpeg';
import img182 from '../../assets/cool2/frame_0182.jpeg';
import img183 from '../../assets/cool2/frame_0183.jpeg';
import img184 from '../../assets/cool2/frame_0184.jpeg';
import img185 from '../../assets/cool2/frame_0185.jpeg';
import img186 from '../../assets/cool2/frame_0186.jpeg';
import img187 from '../../assets/cool2/frame_0187.jpeg';
import img188 from '../../assets/cool2/frame_0188.jpeg';
import img189 from '../../assets/cool2/frame_0189.jpeg';
import img190 from '../../assets/cool2/frame_0190.jpeg';
import img191 from '../../assets/cool2/frame_0191.jpeg';
import img192 from '../../assets/cool2/frame_0192.jpeg';
import img193 from '../../assets/cool2/frame_0193.jpeg';
import img194 from '../../assets/cool2/frame_0194.jpeg';
import img195 from '../../assets/cool2/frame_0195.jpeg';
import img196 from '../../assets/cool2/frame_0196.jpeg';
import img197 from '../../assets/cool2/frame_0197.jpeg';
import img198 from '../../assets/cool2/frame_0198.jpeg';
import img199 from '../../assets/cool2/frame_0199.jpeg';
import img200 from '../../assets/cool2/frame_0200.jpeg';
import img201 from '../../assets/cool2/frame_0201.jpeg';
import img202 from '../../assets/cool2/frame_0202.jpeg';
import img203 from '../../assets/cool2/frame_0203.jpeg';
import img204 from '../../assets/cool2/frame_0204.jpeg';
import img205 from '../../assets/cool2/frame_0205.jpeg';
import img206 from '../../assets/cool2/frame_0206.jpeg';
import kaVid from '../../assets/kaVid.mp4'

function KeyboardAnimation() {

    gsap.registerPlugin(ScrollTrigger);

    const frames = {
        currentIndex: 0,
        maxIndex: 206,
    };

    const imagesArray = [
        img1, img2, img3, img4, img5, img6, img7, img8, img9,
        img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,
        img20, img21, img22, img23, img24, img25, img26, img27, img28, img29,
        img30, img31, img32, img33, img34, img35, img36, img37, img38, img39,
        img40, img41, img42, img43, img44, img45, img46, img47, img48, img49,
        img50, img51, img52, img53, img54, img55, img56, img57, img58, img59,
        img60, img61, img62, img63, img64, img65, img66, img67, img68, img69,
        img70, img71, img72, img73, img74, img75, img76, img77, img78, img79,
        img80, img81, img82, img83, img84, img85, img86, img87, img88, img89,
        img90, img91, img92, img93, img94, img95, img96, img97, img98, img99,
        img100, img101, img102, img103, img104, img105, img106, img107, img108, img109,
        img110, img111, img112, img113, img114, img115, img116, img117, img118, img119,
        img120, img121, img122, img123, img124, img125, img126, img127, img128, img129,
        img130, img131, img132, img133, img134, img135, img136, img137, img138, img139,
        img140, img141, img142, img143, img144, img145, img146, img147, img148, img149,
        img150, img151, img152, img153, img154, img155, img156, img157, img158, img159,
        img160, img161, img162, img163, img164, img165, img166, img167, img168, img169,
        img170, img171, img172, img173, img174, img175, img176, img177, img178, img179,
        img180, img181, img182, img183, img184, img185, img186, img187, img188, img189,
        img190, img191, img192, img193, img194, img195, img196, img197, img198, img199,
        img200, img201, img202, img203, img204, img205, img206
    ];
    const images = useRef([]);
    const canvasRef = useRef();


    // function preLoadImages() {  
    //     const loadPromises = imagesArray.map((imageurl) => {  
    //         return new Promise((resolve, reject) => {  
    //             const img = new Image();  
    //             img.src = imageurl;  
    //             img.onload = () => {  
    //                 images.current.push(img);  
    //                 resolve(); // Resolve when the image loads 
    //                 console.log('hello') 
    //             };  
    //             img.onerror = () => {  
    //                 console.error(`Failed to load image at: ${imageurl}`);  
    //                 reject(); // Reject if loading fails  
    //             };  
    //         });  
    //     });  

    //     Promise.all(loadPromises).then(() => {  
    //         loadImage(frames.currentIndex);  
    //         animation();  
    //     });  
    // }  

    let idk = 0
    function preLoadImages() {
        // imagesArray.map((imageurlsa) => {  
        for (let i = 0; i <= frames.maxIndex; i++) {
            const imageurl = imagesArray[i];
            const img = new Image();
            img.src = imageurl;
            img.onload = () => {
                idk++;
                if(idk == frames.maxIndex){
                    // console.log('heelo');
                    loadImage(frames.currentIndex);
                    animation()
                }
                
            };
            images.current.push(img);
        }
        // })
    }

    function loadImage(index) {
        if (index >= 0 && index <= frames.maxIndex) {
            const img = images.current[index];
            // img.style.borderRadius = "20px"
            const canvas = canvasRef.current;

            if (canvas) { // Check if image has loaded using complete property  
                const context = canvas.getContext('2d');
                canvas.width = window.innerWidth - 20;
                canvas.height = window.innerHeight;
                const scaleX = canvas.width / img.width;
                const scaleY = canvas.height / img.height;
                const scale = Math.max(scaleX, scaleY);

                const newWidth = img.width * scale/ 3;
                const newHeight = img.height * scale /3;

                const offsetX = (canvas.width - newWidth) / 2;
                const offsetY = (canvas.height - newHeight) / 2;

                context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas  
                context.drawImage(img, 50, offsetY, newWidth, newHeight); // Draw the image  
                frames.currentIndex = index;
            } else {
                console.warn(`Image is not fully loaded for index ${index}`); // Log if image is not loaded  
            }
        }
    }


    function animation() {
        // console.log('anime');
        
        function updateframe(index){
            return {
                currentIndex: index,
                onUpdate: function () {
                    loadImage(Math.floor(frames.currentIndex));
                }
            }
        }

        gsap.timeline({
            scrollTrigger: {
                trigger: ".parent",
                start: "top top",
                scrub: 2,
            }
        })
            .to(frames, updateframe(50), "first")
            .to(".text1",   {opacity: 0, ease: "linear",}, "first")

            .to(frames, updateframe(80), "second")
            .to(".text2",   {opacity: 1, ease: "linear",}, "second")
            
            .to(frames, updateframe(110), "third")
            .to(".text2",   {opacity: 1, ease: "linear",}, "third")
            
            .to(frames, updateframe(140), "fourth")
            .to(".text2",   {opacity: 0, ease: "linear",}, "fourth")

            .to(frames, updateframe(170), "fifth")
            .to(".text3",   {opacity: 1, ease: "linear",}, "fifth")

            .to(frames, updateframe(190), "sixth")
            .to(".text3",   {opacity: 1, ease: "linear",}, "sixth")

            .to(frames, updateframe(206), "seventh")
            .to(".text3",   {opacity: 0, ease: "linear",}, "seventh")
            
    }
    // useEffect(() => {
    //     preLoadImages();
    // }, []);

    const textRef = useRef();
    const [currentText, setCurrentText] = useState(0); // State to track current text index  

    const texts = [  
        {  
            title: "Level Up Your Gaming!",  
            description: "Explore our extensive collection of games and gear to enhance your playtime!"  
        },  
        {  
            title: "Join the Gaming Revolution!",  
            description: "Discover the latest titles and cutting-edge accessories designed for every gamer!"  
        },  
        {  
            title: "Your Adventure Begins Here!",  
            description: "Unlock a new realm of gaming with epic titles and gear tailored for you!"  
        }  
    ];  

    function changeText() {  
        let index = 0;  

        const interval = setInterval(() => {  
            // Animate the current text out  
            gsap.to(textRef.current, { opacity: 0, duration: 1, onComplete: () => {  
                // Update the text index after fade out  
                index = (index + 1) % texts.length; // Cycle through text array  
                setCurrentText(index); // Update the state with the new index  

                // Animate the new text in  
                gsap.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });  
            }});  
        }, 5000); // Change every 5 seconds to allow for 1 second of fade out and 1 second of fade in  

        return () => clearInterval(interval); // Cleanup on unmount  
    }   

    useEffect(() => {  
        preLoadImages();  
        const intervalCleanup = changeText(); // Start text change  
        return intervalCleanup; // Cleanup the interval on component unmount   
    }, []); 



    return (
        <>
        <div className='KeyboardAnimation'>
            <div className="parent">
                <div className="child">
                    <canvas ref={canvasRef} id='frame'></canvas>

                    <div className="text1">
                        <h4>Level Up Your Gaming!</h4>
                        <p>Explore our extensive collection of games and gear to enhance your playtime!</p>
                    </div>
                    <div className="text2">
                        <h4>Join the Gaming Revolution!</h4>
                        <p>Discover the latest titles and cutting-edge accessories designed for every gamer!</p>
                    </div>
                    <div className="text3">
                        <h4>Your Adventure Begins Here!</h4>
                        <p>Unlock a new realm of gaming with epic titles and gear tailored for you!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="KeyboardAnimationMob">
            <div className="vidBox">
                <div autoPlay='true' muted loop id="myVideo1" data-aos="zoom-in">
                    <img loading='lazy' className='vidImg' src={mobileImg}  />
                </div>
            </div>
            <div className="txt" ref={textRef}>
            <h4>{texts[currentText].title}</h4>  
            <p>{texts[currentText].description}</p>  
            </div>
        </div>
        </>
    );
}

export default KeyboardAnimation;