import React, { useEffect } from 'react'
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import wukong from '../../assets/wukong.mp4'
import dbz from '../../assets/dbz.mp4'
import gow from '../../assets/gow.mp4'
import gta from '../../assets/gta.mp4'
import gowImg from '../../assets/gow.png'
import gtaImg from '../../assets/gta.jpg'
import wukongImg from '../../assets/wukong1.jpg'
import dbzImg from '../../assets/dbz.jpg'
import './Hero.scss'
function Hero() {



  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "-78%"]);


  return (
    <>
      <div className='heroMain'>
        <h1 data-aos="fade-up" >NEW UPCOMMING GAMES</h1>
        <div ref={targetRef} className="sticky_parent">
          <div className="sticky" id='sticky'>
            <motion.div style={{ x }} className="scroll_section">
              <a target='_blank' href="https://www.playstation.com/en-in/games/black-myth-wukong/">
                <div className="upcommingGames1" data-aos="zoom-in" >
                  <video autoPlay='true' muted loop id="myVideo1" data-aos="zoom-in">
                    <source src={wukong} type="video/mp4" />
                  </video>
                </div>
              </a>

              <a target='_blank' href="https://www.rockstargames.com/VI">
                <div className="upcommingGames2" >
                  <video autoPlay='true' muted loop id="myVideo2" data-aos="zoom-in" >
                    <source src={gta} type="video/mp4" />
                  </video>
                </div>
              </a>

              <a target='_blank' href="https://en.bandainamcoent.eu/dragon-ball/dragon-ball-sparking-zero">
                <div className="upcommingGames3"  >
                  <video style={{ filter: 'brightness(80%)' }} autoPlay='true' muted loop id="myVideo3" data-aos="zoom-in" >
                    <source src={dbz} type="video/mp4" />
                  </video>
                </div>
              </a>

              <a target='_blank' href="https://www.playstation.com/en-in/games/god-of-war-ragnarok/">
                <div className="upcommingGames4" >
                  <video autoPlay='true' muted loop id="myVideo4" data-aos="zoom-in">
                    <source src={gow} type="video/mp4" />
                  </video>
                </div>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="smallSection">
          <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img loading='lazy' src={wukongImg} class="d-block w-100 caroulesImg" alt="..." />
              </div>
              <div class="carousel-item">
                <img loading='lazy' src={gtaImg} class="d-block w-100 caroulesImg" alt="..." />
              </div>
              <div class="carousel-item">
                <img loading='lazy' src={dbzImg} class="d-block w-100 caroulesImg" alt="..." />
              </div>
              <div class="carousel-item">
                <img loading='lazy' src={gowImg} class="d-block w-100 caroulesImg" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero