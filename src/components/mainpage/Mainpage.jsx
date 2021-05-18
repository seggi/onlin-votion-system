import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { authFetch, logout }  from '../../auth/loginpage';

import '../style/mainpage/sidebarTopbar.css';
import TopBar from './Topbar';
import SideBar from './Sidebar';
import GLobalSituation from "./mainbox/dashboard/Globalsituation";
import ValidateCandidacy from "./mainbox/dashboard/Validatecandidacy";


function MainPage() {
    const [loggedin, setLoggedin] = useState("")
    
    useEffect(() => {
        authFetch("http://localhost:5000/main/api/protected",{
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(r => r.json())
        .then(result => {
            setLoggedin(result.logged_in_as)
        })
    }, [])

    return (
        <>
            <div className="wrapper">
                <button onClick={() => logout() }>Logout</button>
                <TopBar
                    appName={'Admin'}
                    username={'Admin'}
                    />
                <SideBar authlogin={loggedin} />
                <div className="main-container">
                    <Route exact={true} path='/main_page/dashboard' component={GLobalSituation} />
                    <Route exact={true} path='/main_page/dashboard/validate_candidacy' component={ValidateCandidacy} />
                </div>
             </div>
        </>
    )
}

export default MainPage;