import React, {useEffect} from 'react'
import './Home.scss'

import FutermanLogo from '../../imgs/futerman-logo.png'
import HylaurLogo from '../../imgs/hyalur-logo.png'
import { FaPlay } from "react-icons/fa";

function Home({setPage, nextPage}) {
  
  useEffect(() => {
    document.body.classList.add('no-scroll');
  }, []);

  return (
    <div className='home-container'>
        <div className="img-container">
            <img src={FutermanLogo}/>
            <img src={HylaurLogo}/>
            <img/>
        </div>
        <h1>¿Listo para jugar?</h1>
        <div className="button-container">
            <button onClick={()=>{setPage(nextPage)}}><FaPlay size={40} color='white'/></button>
        </div>
    </div>
  )
}

export default Home