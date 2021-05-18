// import React, {useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";

// import LoadPage from "./Loadpage";

// const required =  value => {
//     if (!value) {
//         return (
//             <div style={{ color:  "white", }} className="alert alert-danger" role="alert">
//                 This field is required!
//             </div>
//         )
//     }
// }


// function LoginPage() {
//     const history = useHistory();
//     const { username, setUsername }  = useState('');
//     const { password, setPassword }  = useState('');
//     const { message, setMessage }  = useState('');

//     const onChangeUsername =  (e) => {
//         setUsername(e.target.value);
//     }

//     const onChangePassword = (e) => {
//         setPassword(e.target.value);
//     }

//     useEffect(() => {
       
//     }, []);

//     return (
//         <>
//             <div className="all__pages">
//                 <div className="row column">
//                     <div className="left__content-box">
//                         <form>
//                             <h1>Username</h1>
//                             <input 
//                                 type="text"
//                                 placeholder="Username"
//                                 name="username"
//                                 value={ username }
//                                 onChange={ onChangeUsername }
//                                 validations = { [required] }
//                                 />

//                             <h1>Password</h1>
//                             <input 
//                                 type="password"
//                                 placeholder="*******"
//                                 name="password"
//                                 value={ password }
//                                 onChange={ onChangePassword }
//                                 validations={ [required] }
//                                 />
                            
//                             <Link>
//                                 {
//                                     message && (
//                                         <div className="form-group">
//                                             <div style={{ color: "white" }} className="alert alert-danger" role="alert">
//                                                 { message ? message : <LoadPage/> }
//                                             </div>
//                                         </div>
//                                     )
//                                 }
//                             </Link>

//                             <Link to="/signup" className="dontHave">
//                                 Admin Create an account
//                             </Link>
//                         </form>
//                     </div>
//                 </div>
//                 <div className="right__content">
//                     <div className="login-items">
//                         <h2>Online voting system</h2>
//                         <span>nankim64@gmail.com</span>
//                         <span>+250 782 015 589</span>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )


// }

// export default LoginPage;



import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";

import { login } from '../../auth/loginpage';
import LoadPage from './Loadpage';

const required =  value => {
    if (!value) {
        return (
            <div style={{ color: "white" }} className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

function LoginPage() {
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    useEffect( () => {
        // fetch("http://localhost:5000/api/start_page_data", {
        //     method: "POST",
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        // .then(response => response.json())
        // .then(result => {
        //     for(let item in result[1]) {
                
        //     }
        // })
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('')

        let opts = {
            'email': username,
            'password': password
        }

    
        if (username != "" &&  password != "") {
            fetch("http://localhost:5000/api/login", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(opts)
            })
            .then(r => r.json())
            .then(token => {
                if(token.accessToken) {
                    login(token.accessToken)
                    history.push("/main_page/dashboard")
                }
                else {
                    setMessage(token.error)
                }
            })
        }
        else {
            setMessage("You must fill all fields")
        }
    }


    return (
        <>
            <div className="all__pages" >
                <div className="row column">
                    <div className="left__content">
                        <div className="login__content-box">
                            <form>
                                <h1>Login</h1>

                                <span>Username</span>
                                <input 
                                    type="text" 
                                    placeholder="username"
                                    name="username"
                                    value={ username }
                                    onChange={ onChangeUsername }
                                    validations = { [required] }
                                    />

                                <span>Password</span>
                                <input 
                                    type="password" 
                                    placeholder="******" 
                                    name="password"
                                    value={ password }
                                    onChange={ onChangePassword }
                                    validations={ [required] }
                                    />

                                <Link to="/">Forget Password?</Link>

                                <Link className="validBtn">
                                    <button 
                                        type="submit"
                                        onClick= { handleLogin }
                                        >
                                        Sign In
                                    </button>
                                </Link>
                                {
                                    message && (
                                        <div  className="form-group">
                                            <div style={{ color: "white" }} className="alert alert-danger" role="alert">
                                                { message? message : <LoadPage/> }
                                            </div>
                                        </div> 
                                    )
                                }

                                <Link to="/signup" className="dontHave">
                                    Don't have an account? click here to register.
                                </Link>
                            </form>
                        </div>
                    </div>

                    <div className="right__content">
                        <div className="login-items">
                        <h2>Online voting system</h2>
                        <span>nankim64@gmail.com</span>
                        <span>+250 782 015 589</span>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
