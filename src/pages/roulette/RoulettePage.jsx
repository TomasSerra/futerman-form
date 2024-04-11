import { useState, useEffect } from 'react';
import styles from './Roulette.module.scss'
import Roulette from '../../components/roulette/Roulette'
import Hand from '../../imgs/mano.webp'
import { Wheel, WheelData } from 'react-custom-roulette'
import { getDatabase, ref, child, push, update , get} from "firebase/database";
import app from '../../FirebaseConfig';



function RoulettePage({nextPage, setPage}) {
  
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [text, setText] = useState(true);
  const [rotate, setRotate] = useState(false);
  const db = getDatabase(app);


  const data = [
    { option: '10%', style: { backgroundColor: '#9A99F2', textColor: 'black' } },
    { option: '5%', style: { backgroundColor: '#CCDCFF', textColor: 'black' } },
    { option: '10%', style: { backgroundColor: '#9A99F2', textColor: 'black' } },
    { option: '20%', style: { backgroundColor: '#FFDD55', textColor: 'black' } },
    { option: '10%', style: { backgroundColor: '#9A99F2', textColor: 'black' } },
    { option: '5%', style: { backgroundColor: '#CCDCFF', textColor: 'black' } },
    { option: '10%', style: { backgroundColor: '#9A99F2', textColor: 'black' } },
    { option: '15%', style: { backgroundColor: '#f15bb5', textColor: 'black' } },
  ]

  //Bloquear click derecho
  useEffect(() => {
    const bloquearClickDerecho = (event) => {
        event.preventDefault();
    };
    const preventZoom = (e) => {
      e.preventDefault();
    };

    document.body.classList.add('no-scroll');

    document.addEventListener('gesturestart', preventZoom);
    document.addEventListener('contextmenu', bloquearClickDerecho);

    return () => {
      document.removeEventListener('contextmenu', bloquearClickDerecho);
      document.removeEventListener('gesturestart', preventZoom);
    };
  }, []);

  function rotateRoulette(){
    setPrizeNumber(calculateProbability());
    setRotate(true);
    setText(false);
  }

  function calculateProbability(){
    let number = Math.floor(Math.random()*100);
    return number < 20 ? 0 : number < 40 ? 2 : number < 60 ? 4 : number < 80 ? 6 : number < 85 ? 1 : 5;
  }

  function stopSpinning(){
    setRotate(false);
    const postKey = localStorage.getItem('postKey');
    const updates = {};
    updates[postKey] = {descuento: prizeNumber};

    update(ref(db), updates).then(() => {
      setTimeout(()=>{
        setPage(nextPage);
      }, 5000)
    })
  }

  return (
      <div className={styles.Roulette} onMouseDown={()=>{if(!rotate || text) rotateRoulette();}} onResizeCapture={(e)=>console.log(e)}>
          <div className={styles.background}>
          </div>
          {text && <h1 className={styles.text}>TOCA PARA JUGAR</h1>}
          <div className={styles['roulette-container']}>
          <Wheel
            mustStartSpinning={rotate}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              stopSpinning();
            }}
            outerBorderWidth={20}
            outerBorderColor={'#72559F'}
            radiusLineWidth={0}
            radiusLineColor='white'
            fontSize={30}
            spinDuration={0.5}
            pointerProps={{style:{width: '23%'}}}
            innerRadius={0}
            innerBorderColor={'#72559F'}
            innerBorderWidth={40}
          />
          {text && <img className={styles.hand} src={Hand}/>}
          </div>
      </div>
  )
}

export default RoulettePage;