import React, { useState, useEffect }  from "react";

import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';

import { faPrint, faTrash, faReplyAll, faInbox, faCheck } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authFetch } from "../../../../auth/loginpage";

import styled from 'styled-components';

library.add(faPrint,faTrash, faReplyAll, faInbox, faCheck);


const BtnConfirm = styled.button`
    color: #b0a99d;
    font-size: '18px';
    border: none;
    background: none;
    margin-left: 10px;
    &:focus {
        outline: none;
        box-shadow: none;
    }
    &:hover {
        cursor: pointer;
    }
`
const BtnResponded = styled.button`
    color: green;
    font-size: '18px';
    border: none;
    background: none;
    margin-left: 10px;
    &:focus {
        outline: none;
        box-shadow: none;
    }
    &:hover {
        cursor: pointer;
    }
`

function ValidateCandidacy() {
    const [post, setPost] = useState('');
    const [getData, setGetData] = useState([]);

    const confirmRow = (id, confirm) => {
        let rowid = {
            'confirmcandidacy': id,
            'confirmstatus': confirm
        }
        authFetch("http://localhost:5000/main/api/confirm_request", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowid)
        }).then(resp => resp.json())
        .then(result => {
            if (result.data) {
                setGetData(result.data.map((item, index) => {
                    let getdatas = {
                        id: item.candidateid,
                        fullname: `${item.first_name} ${item.last_name}`,
                        candidatepicture: <img src={`data:image/jpeg;base64,${item.candidatepicture}`} width={70}  height={70}/>,
                        email: item.email,
                        regnumber: `${item.reg_number == 'null' ? 'NTR' : item.reg_number}`,
                        faculty: item.faculty,
                        status: item.status 
                
                    }
                    return getdatas;
                })
                )
            }
            else {
                alert(result.error)
            }
        })
    }
    useEffect(() => {
        authFetch("http://localhost:5000/main/api/admin_retrieve_candidate_list")
        .then(resp => resp.json())
        .then(result => {
            if (result.data) {
                setGetData(result.data.map((item, index) => {
                    let getdatas = {
                        id: item.candidateid,
                        date: item.date,
                        fullname: `${item.first_name} ${item.last_name}`,
                        candidatepicture: <img src={`data:image/jpeg;base64,${item.candidatepicture}`} width={70}  height={70}/>,
                        email: item.email,
                        regnumber: `${item.reg_number == 'null' ? 'NTR' : item.reg_number}`,
                        faculty: item.faculty,
                        status: item.status 
                
                    }
                    return getdatas;
                })
                )
            }
            else {
                alert(result.error)
            }
        })
    }, []);

    const columns = [
        {  
            Header: 'Candidate Id',  
            accessor: 'id',
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center",
            },
            width: 100,
            maxWidth: 100,
            minWidth: 100
        },
        {
            Header: 'Date',
            accessor: 'date',
            style: {
                textAlign: "center"
            },
            width: 150,
            maxWidth: 150,
            minWidth: 150
        },
        {  
            Header: 'Candidate full name',  
            accessor: 'fullname',
            sortable: false,
            filterable: false,
        },
        {
            Header: "Picture",
            accessor: "candidatepicture",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            },
        },

        {
            Header: "Email",
            accessor: "email",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            },
        },

        {
            Header: "faculty",
            accessor: "faculty",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            },
        },
        
        {
            Header: "Validate",
            Cell: props => {
                return (
                    <>
                        { props.original.status !== 1 ? <BtnConfirm
                            onClick={(() => { 
                                confirmRow(props.original.id, true) 
                                })}
                            >
                            <FontAwesomeIcon icon="check" >
                            </FontAwesomeIcon>
                        </BtnConfirm> : 
                        
                        <BtnResponded  onClick={(() => { 
                            confirmRow(props.original.id, false) 
                            })}
                            >
                            <FontAwesomeIcon icon="check" >
                            </FontAwesomeIcon>
                        </BtnResponded>
                        
                        
                        }
                    </>
                )
            },
            sortable: false,
            filterable: false,
            width: 100,
            maxWidth: 100,
            minWidth: 100
        }
    ]  

    return (
        <>
         <div className="innerMainboxWrapper" style={{ width: '100%'}}>
                <div className="mainboxColumn">
                     <h1 className="mainboxTitle">Validate Candidacy</h1>
                        <div className="tables">
                            <ReactTable 
                                data={getData} 
                                columns={columns}
                                noDataText={"Please Wait..."}
                                filterable
                                defaultPageSize={10}
                                // pageSizeOptions={[2, 4, 6]}
                                >
                            </ReactTable>
                        </div>
                    </div>
            </div>
        
        </>
    )
}

export default ValidateCandidacy;