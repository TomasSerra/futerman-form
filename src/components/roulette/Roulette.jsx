import { useEffect, useState } from 'react'
import './Roulette.scss'


export default function Roulette(props) {
    const colors = ["#FFCBB3", "#F9FFC7", "#FFCBB3", "#F9FFC7", "#10A2ED", "#0DB06D", "#E4D729", "#E93A7B"]

    const [winSize, setWinSize] = useState({width: window.innerWidth, height: window.innerHeight});

    const rel = winSize.width/winSize.height;
    const size = props.size[props.size.length-1] === '%' ? ((Number(props.size.replace("%", ""))/100) * (rel>=1 ? winSize.height : winSize.width)) : (Number(props.size.replace("p", "").replace("x", "")))
    const num = props.elements.length;

    const triangleAngle = 360/num; //Angle in degrees
    const triangleLength = Math.tan(Math.PI/num)*size/2;
    const triangle = (color) =>{
        let styles = {
            borderTop: triangleLength+5 + "px solid transparent",
            borderBottom: triangleLength+5 + "px solid transparent",
            borderRight: size/2 + "px solid "+color
        }
        return styles
    } 
    const centerStyles = {
        'center': {
            width: size*0.2,
            height: size*0.2,
            boxShadow: `0px ${size*0.008}px #00335e`
        },
        'triangle':{
            borderTop: size*0.06 + 'px solid transparent',
            borderBottom: size*0.06 + 'px solid transparent',
            borderLeft: size*0.10 + 'px solid',
            left: size*0.16 + 'px'
        },
        'shadow':{
            borderTop: size*0.053 + 'px solid transparent',
            borderBottom: size*0.053 + 'px solid transparent',
            borderLeft: size*0.089 + 'px solid',
            left: size*0.178 + 'px',
            top: size*0.051 + 'px'
        }        
    }

    const [index, setIndex] = useState(-1);
    
    function rotate(){
        const position = Math.random()*(num-0.5)
        const angle = position*(360/num)
        function ended(element){
            element.style.rotate = props.turns*360+angle+'deg'
            props.handleIndex(Math.round(position))
            setTimeout(()=>{
                setIndex(Math.round(position))
            }, props.time*1000)
            
        }
        document.querySelector("#wheel").animate([
            { rotate: 0+'deg' },
            { rotate: props.turns*360+angle+'deg' }
            ], {
            duration: props.time*1000,
            easing: 'ease-out',
            iterations: 1,
            complete: ended(document.querySelector("#wheel"))
            }
        );        
    }
    
    useEffect(()=>{
        if(props.shouldRotate){
            rotate()
        }
    }, [props.shouldRotate])

    useEffect(()=>{
        const handleResize = () => {
            setWinSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <>
            <button className='center' style={centerStyles.center}>
                <div className='circle' style={centerStyles.center}></div>
                <div className='line' style={centerStyles.triangle}></div>
                <div className='shadow-line' style={centerStyles.shadow}></div>
            </button>
            <div className='shadow' style={{width : (size-15)+"px", height: (size-15)+"px"}}></div>
            <div className='roulette-container' style={{width : size, height: size, borderWidth: size*0.04, boxShadow: `0px ${size*0.008}px #00335e`}}></div>
            <div style={{width : size, height: size}} id="wheel">
                {props.elements.map((element, aux) => {
                    return(
                        <div key={aux} className='roulette' style={{width : size, height: size, transform : "rotate("+(360-triangleAngle*aux)+"deg)"}}>
                            <div className={'triangle ' + (aux===index ? 'selected' : '')} style={triangle(colors[aux])}></div>
                            <h1 style={{right: props.offsets[aux], fontSize: size*0.07 + 'px', whiteSpace: 'preLine', width: 'fit-content'}}>{element.split('').map(char => char==='\n' ? <br key={'7'}/> : char)}</h1>
                        </div>
                    )
                })}
            </div>
            
        </>
    )
}
