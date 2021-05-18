import React, {useState, useEffect} from 'react'

// import ChartSeries from './Chartseries';
// import {cashbookData} from "../../Datas";    

import '../../../style/mainpage/mainpage.css';
import '../../../style/mainpage/globalrepport.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDollarSign, faEuroSign, faStickyNote } from "@fortawesome/free-solid-svg-icons";
// import MainLeftBar from './mainleftbar';
import { authFetch } from '../../../../auth/loginpage';
import CandidateList from './Candidatelist';
// import SelectCurrency from './forms/Selectcurrency';

library.add(faDollarSign, faEuroSign, faStickyNote)


function CompanyInfo() {
    const [users, setUsers] = useState()
    const [candadite, setCandadite] = useState()
    const [students, setStudents] = useState()

    useEffect(() => {
        authFetch("http://localhost:5000/main/api/retriev_global_info",)
        .then(resp => resp.json())
        .then(result => {
            if(result.data) {
                console.log(result.data)
                result.data.map((item) => {
                    setCandadite(item.candidates)
                    setUsers(item.users)   
                    setStudents(item.students) 
               })
            }
            else{
                alert(result.error)
            }
        })
    },[])

    return (
        <>
            <div className="placard__box-info">
                <div className="compSit">
                    <span className="infoleft">Users</span>
                    <span className="inforight">{users == null || users == undefined ? 0 : users}</span>
                </div>
            </div>

            <div className="placard__box-info">
                <div className="compSit">
                    <span className="infoleft">Students</span>
                    <span className="inforight">{students == null || students == undefined ? 0 : students}</span>
                </div>
            </div>

            <div className="placard__box-info">
                <div className="compSit">
                    <span className="infoleft">Candidates</span>
                    <span className="inforight">{candadite == null || candadite == undefined ? 0 : candadite}</span>
                </div>
            </div>
        </>
    )
}

function GLobalSituation() {
    const [users, setUsers] = useState()
    const [candadite, setCandadite] = useState()
    const [students, setStudents] = useState()
    const [abstention, setAdstention] = useState()
   

    useEffect(() => {
        authFetch("http://localhost:5000/main/api/retrieve_global_info",)
        .then(resp => resp.json())
        .then(result => {
            if (result.data) {
                console.log(result.data)
                // result.data.map((item) => {
                    setCandadite(`${result.data[1].candidates}`)
                    setStudents(`${result.data[1].students}`)
                    setUsers(`${result.data[2].paticipants}`)
                    setAdstention(`${result.data[1].students - result.data[2].paticipants}`)
                // })
            }
            else{
                alert(result.error)
            }
        })
    }, [])

   
    // const onHandleSubmit = (e) => {
    //     e.preventDefault()
    //     const opts = prcurrency
    //     authFetch("http://localhost:5000/main/api/admin_global_repport", {
    //         method: "POST",
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(opts)
    //     })
    //     .then(resp => resp.json())
    //     .then(result => {
    //         if (result.data) {
    //             console.log(result.data)
    //             result.data.map((item) => {
    //                 setUpdateDebit(`${item.currency}${item.debit}`)
    //                 setUpdateCredit(`${item.currency}${item.credit}`)
    //                 setUpdateGlobal(`${item.currency}${item.debit - item.credit}`)
    //             })
    //         }
    //         else {
    //             alert(result.error)
    //         }
    //     })
    // }

    return (
        <>
            <div className="innerMainboxWrapper" style={{ width: '100%'}}>
                <div className="mainboxColumn">
                    {/* <h1 className="mainboxTitle">Global Info</h1>
                    <div className="mainboxColumn__placard">
                        <CompanyInfo />
                    </div> */}

                    <h1 className="mainboxTitle">Vote situation</h1>
                    
                    <div className="mainboxColumn__placard">
                        <div className="placard leftcard">
                            <h2>Participants</h2>
                            <div className="placard__box">
                                <div className="placard_currency"> 
                                    <span>{users !== undefined ? users : '0' }</span>
                                </div>
                            </div>
                        </div>

                        <div className="placard  middlecard">
                            <h2>Candidates</h2>
                            <div className="placard__box">
                                <div className="placard_currency">
                                    <span>{candadite !== undefined ? candadite : '0'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="placard rightcard">
                            <h2>Total students</h2>
                            <div className="placard__box">
                                <div className="placard_currency">
                                    <span>{students !== undefined ? students : '0'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="placard lastcard">
                            <h2>Abstention</h2>
                            <div className="placard__box">
                                <div className="placard_currency">
                                    <span>{abstention !== undefined ? abstention : '0'}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mainboxColumn__chart">
                        {/* <div className="chartbox">
                            <ChartSeries />
                        </div> */}
                        <CandidateList />
                    </div>
                </div>
            </div>
            {/* <MainLeftBar /> */}
        </>
    )
}

export default GLobalSituation
