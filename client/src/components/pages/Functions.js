import React from 'react'
import s from './Functions.module.css'
import "animate.css/animate.min.css"; 
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Functions = ({funciones}) => {
    console.log(funciones)
    return (
        <section id="Functions" className={s.container}>
             <AnimationOnScroll animateIn="animate__fadeInUp" >

            <div className={s.Functions}>
                <div className={s.title}>
                <div className={s.line}></div>
                <h1 className={s.text}>Horarios</h1>
                <div className={s.line}></div>
                </div>
                <div className={s.containerTime}>
                
                    {
                        funciones.map((funcion) =>(
                            <button className={s.time}>{funcion.time}</button>
                            ))
                        }
          
                </div>
                
            </div>
                        </AnimationOnScroll>
        </section>
    )
}

export default Functions