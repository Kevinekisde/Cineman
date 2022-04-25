import React, { useState } from 'react'
import { FirebaseApp } from '../firebase'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/constants';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(FirebaseApp); 

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registrando, setRegistrando] = useState(false)


    const registrarUsuario = async(email,password) => {
        const infoUsuario = createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            localStorage.setItem('user', JSON.stringify(user.user));
            dispatch({
                type: LOGIN,
                payload: user.user,
           });
           navigate("/home")
        })
    }

   

    const submitHandler = (e) =>{
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value
        console.log("Submit", email, password)

        if(registrando){
            registrarUsuario(email,password)
        }else{
            signInWithEmailAndPassword(auth,email, password)
            .then((user)=>{
                localStorage.setItem('user', JSON.stringify(user.user));
                dispatch({
                    type: LOGIN,
                    payload: user.user,
               });
               navigate("/home")
            })
        }
    }


    return (
        <div>
            <h1>{registrando? "Registrate" : "Inicia Sesion"}</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Correo electrónico:
                    <input type="email" id="email"/>
                </label>
                <label>
                    Contraseña:
                    <input type="password" id="password"/>
                </label>
            <input type="submit" value={registrando?"Registrar":"Iniciar Sesion"}/>
            </form>
            <button onClick={() => setRegistrando(!registrando)}>
            {registrando ?"Ya tengo una cuenta": "Quiero Registrarme"}
            </button>

        </div>
    )
}

export default Register