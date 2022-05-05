import React, { useState } from 'react'
import { FirebaseApp } from '../../firebase'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { authentication } from '../../firebase'
import { createUser } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import s from './Login.module.css'
import { useNavigate } from 'react-router-dom';
const auth = getAuth(FirebaseApp);


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LOGIN = useSelector((state) => state.login);
    const [registrando, setRegistrando] = useState(false)
    const [input, setInput] = useState({
        id: "",
        name: "",
        image: "",
        email: ""
    })




    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((result) => {
                localStorage.setItem("user", JSON.stringify(result.user));
                dispatch({
                    type: LOGIN,
                    payload: result.user,
                });
                dispatch(createUser({
                    id: result.user.uid,
                    name: result.user.displayName,
                    image: result.user.photoURL,
                    email: result.user.email
                }))
                navigate("/home")
                window.location.reload()
            })

    }

    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(authentication, provider)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.user));
                dispatch({
                    type: LOGIN,
                    payload: result.user,
                });
                dispatch(createUser({
                    id: result.user.uid,
                    name: result.user.displayName,
                    image: result.user.photoURL,
                    email: result.user.email
                }))
                navigate("/home")
                window.location.reload()
            })
    }


    const registrarUsuario = async (email, password) => {
        const infoUsuario = createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.user));
                dispatch({
                    type: LOGIN,
                    payload: result.user,
                });
                dispatch(createUser({
                    id: result.user.uid,
                    name: result.user.displayName,
                    image: result.user.photoURL,
                    email: result.user.email
                }))

                navigate("/home")
                window.location.reload()
            })
    }



    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value
        console.log("Submit", email, password)

        if (registrando) {
            registrarUsuario(email, password)
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    localStorage.setItem('user', JSON.stringify(result.user));
                    dispatch({
                        type: LOGIN,
                        payload: result.user,
                    });
                    dispatch(createUser({
                        id: result.user.uid,
                        name: result.user.displayName,
                        image: result.user.photoURL,
                        email: result.user.email
                    }))
                    navigate("/home")
                    window.location.reload()
                })
        }
    }
    return (
        
                
        <div className={s.container}>
                    <div className={s.containerLogin}>
                        <div className={s.exit}>
                        <button onClick={() => {navigate("/home")}}>X</button>
                        </div>
                        <form  className={s.containerForm}onSubmit={submitHandler}>
                            <h1>{registrando ? "Register" : "Login"}</h1>
                            <div className={s.input}>
                                <label className={s.inputLabel}>
                                    USERNAME <br></br>
                                    <input type="email" id="email" />
                                </label>
                                <label className={s.inputLabel}>
                                    PASSWORD<br></br>
                                    <input type="password" id="password" />
                                    <h4>FORGOT PASSWORD?</h4>
                                </label>
                            </div>
                            <div className={s.buttonsLogin} >
                            <input className={s.loginRegister} type="submit" value={registrando ? "Registrar" : "Iniciar Sesion"} />
                            <button className={s.loginRegister} onClick={() => setRegistrando(!registrando)}>
                                {registrando ? "LogIn" : "Register"}
                            </button>
                            </div>
                        </form>
                        <div className={s.styledbutton}>
        <GoogleLoginButton className={s.loginButtons} text="Log in with Google" style={{ width: "200px", borderRadius: "10px", fontSize:"13px" }} align={"center"} onClick={signInWithGoogle}></GoogleLoginButton>
        <FacebookLoginButton className={s.loginButtons} text="Log in with Facebook" style={{ width: "200px", borderRadius: "10px",fontSize:"13px" }} align={"center"} onClick={signInWithFacebook}></FacebookLoginButton>
                        </div>
                    </div>
        </div>
    )
}

export default Login