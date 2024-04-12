import { useState, useEffect } from 'react';
import styles from './Roulette.module.scss'
import Hand from '../../imgs/mano.webp'
import { Wheel} from 'react-custom-roulette'
import { getDatabase, ref, update} from "firebase/database";
import app from '../../FirebaseConfig';



function RoulettePage({nextPage, setPage, setDiscount, discount}) {
  
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
    if(navigator.onLine){
      setPrizeNumber(calculateProbability());
      setRotate(true);
      setText(false);
    }else{
      alert('Por favor conectate a internet para continuar');
    }
  }

  function calculateProbability(){
    let number = Math.floor(Math.random()*100);
    setDiscount(number < 80 ? 10 : number < 95 ? 5 : 15)
    return number < 20 ? 0 : number < 40 ? 2 : number < 60 ? 4 : number < 80 ? 6 : number < 87 ? 1 : number < 95 ? 5 : 7;
  }

  function stopSpinning(){
    const postKey = localStorage.getItem('postKey');
    const updates = {descuento: discount+'%'};

    if (navigator.onLine) {
      try{
        update(ref(db, '/'+postKey), updates).then(() => {
          setTimeout(()=>{
            setPage(nextPage);
          }, 2000)
        }).catch((error) => {
          alert('Error al conectar con la base de datos, intenta nuevamente');
          setRotate(false);
          setText(true);
        });
      }
      catch(e){
        alert('Error al conectar con la base de datos, intenta nuevamente');
        setRotate(false);
        setText(true);
      }
    }else{
      alert('Por favor conectate a internet para continuar');
      setRotate(false);
      setText(true);
    }

  }

  return (
      <div className={styles.Roulette} onMouseDown={()=>{if(!rotate || text) rotateRoulette();}} onResizeCapture={(e)=>console.log(e)}>
          <h1 className={styles.title}>Girá la ruleta</h1>
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