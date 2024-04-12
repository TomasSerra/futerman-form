import React, {useEffect, useState} from 'react'
import styles from './End.module.scss'
import Logo1 from '../../imgs/futerman-logo.png'
import Logo2 from '../../imgs/hyalur-logo.png'
import Logo3 from '../../imgs/hydro-logo.png'
import Discount from '../../imgs/discount.png'


function End({discount}) {

  const [hasDiscount, setHasDiscount] = useState(0);

  useEffect(() => {
    document.body.classList.add('no-scroll');

    if(localStorage.getItem('discount') !== null){
     setHasDiscount(localStorage.getItem('discount'));
    }
    else{
      localStorage.setItem('discount', discount);
    }
  }, []);

  return (
    <div className={styles['end-container']}>
      <div className={styles['titles']}>
        <img src={Logo1} draggable='false'/>
        <h1>¡Genial!</h1>
        <h2>Tu premio es:</h2>
      </div>

      <div className={styles['discount']}>
        <h1>{hasDiscount !== 0 ? hasDiscount : discount}% OFF</h1>
        <p>Para usar en tu compra dentro de la feria</p>
        <img src={Discount} draggable={false}/>
      </div>

      <div className={styles['logos']}>
        <img src={Logo2}/>
        <img src={Logo3} draggable='false'/>
      </div>
    </div>
  )
}

export default End