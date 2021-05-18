import React, { useState, useEffect } from 'react';
import { Link, useHistory }  from 'react-router-dom';


import LoadPage from './Loadpage';


const required = value => {
    if (!value) {
        return (
            <div style={{ color: "white" }} className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div  className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};


const vpassword = value => {
    if(value.length < 6 || value.length > 40) {
        return (
            <div  className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vpassword1 = value => {
    if(value.length < 6 || value.length > 40) {
        return (
            <div  className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};


function SignupPage() {
    const history = useHistory;
    const [fullname, setfullname] = useState('')
    const [email, setEmail] = useState('')
    const [companycategory, setCompanycategory] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [reppassword, setReppassword] = useState('')
    const [message, setMessage] =  useState('')
    const [successful, setSuccessful] = useState(false)

    const onChangefullname = (e) => {
        setfullname(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeReppassword = (e) => {
        setReppassword(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setSuccessful(false);

        let opts = {
            'fullname': fullname,
            'email': email,
            'username': username,
            'passwordhash': password,
            'reppeatpassword': reppassword,
            'is_admin': 1,
            'is_public': 0
        }
        let errmsg = "Password did not match! please try again."
        console.log(opts)

        if (password === reppassword) {
            fetch("http://localhost:5000/api/signup", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(opts)
            })
            .then(response => response.json())
            .then(rsp => {
                if(rsp.message) {
                    setMessage(rsp.message)
                }
                else {
                    setMessage(rsp.error);
                }
            })
            // history.push("/login")
        }
        else {
            setMessage(errmsg)
        }
    }

    return (
        <>
            <div className="all__pages">
                <div className="row column">
                    <div className="middle__content" 
                        >
                        <div className="signup__content-box">
                            <form>
                                <h1>Register</h1>

                                <span>Full name</span>
                                <input 
                                    type="text" 
                                    placeholder="Full name" 
                                    name="fullname"
                                    value={fullname}
                                    validations={[required]}
                                    onChange={ onChangefullname }
                                    />

                                <span>Email </span>
                                <input 
                                    type="text" 
                                    placeholder="email"
                                    name="email"
                                    value={email}
                                    validations={[required]}
                                    onChange={ onChangeEmail }
                                    />
                                
                                <span>Username</span>
                                <input 
                                    type="text" 
                                    placeholder="username"
                                    name="username"
                                    value = {username}
                                    validations={[required, vusername]}
                                    onChange={ onChangeUsername }
                                     />

                                <span>Password</span>
                                <input 
                                    type="password" 
                                    placeholder="******" 
                                    name="password"
                                    value={password}
                                    validations={[required, vpassword]}
                                    onChange={ onChangePassword }
                                    />

                                <span>Repeat password</span>
                                <input 
                                    type="password" 
                                    placeholder="" 
                                    name="reppassword"
                                    value = {reppassword}
                                    validations={[required, vpassword1]}
                                    onChange={ onChangeReppassword }
                                    />

                                <br />

                                <Link  className="validBtn">
                                    <button 
                                        type="submit"
                                        onClick={ handleRegister }
                                        >
                                        Sign Up
                                    </button>
                                </Link>

                                {message && (
                                    <div style={{ color: "white" }} >
                                        {message ? message : <LoadPage />}
                                    </div>
                                )}

                                <Link to="/login" className="dontHave">
                                    Already have an account? go back home.
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage


