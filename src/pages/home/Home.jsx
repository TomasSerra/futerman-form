import React, {useEffect} from 'react'
import './Home.scss'

import FutermanLogo from '../../imgs/futerman-logo.png'
import HylaurLogo from '../../imgs/hyalur-logo.png'
import HydroLogo from '../../imgs/hydro-logo.png'
import PlayButton from '../../imgs/play-button.png'

function Home({setPage, nextPage}) {
  
  useEffect(() => {
    document.body.classList.add('no-scroll');
    const discount = localStorage.getItem('discount');
    if(discount){
      setPage(3);
    }
  }, []);

  return (
    <div className='home-container'>
        <div className="img-container">
            <img src={FutermanLogo}/>
            <img src={HylaurLogo}/>
            <img src={HydroLogo} />
        </div>
        <h1>Girá la ruleta y ganá un descuento para tu compra dentro de la feria</h1>
        <div className="bottom">
          <div className="button-container">
              <img src={PlayButton} onClick={()=>{setPage(nextPage)}}/>
          </div>
          <h3>Jugar</h3>
        </div>
    </div>
  )
}

export default Home