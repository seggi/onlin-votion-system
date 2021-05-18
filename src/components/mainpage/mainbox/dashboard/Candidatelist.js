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

function CandidateList() {
    const [post, setPost] = useState('');
    const [getData, setGetData] = useState([]);

    useEffect(() => {
        authFetch("http://localhost:5000/main/api/retrieve_global_info")
        .then(resp => resp.json())
        .then(result => {
            if (result.data) {
                setGetData(result.data[0].map((item, index) => {
                    console.log(item.vote_result, "////")
                    let getdatas = {
                        id: item.candidateid,
                        fullname: `${item.first_name} ${item.last_name}`,
                        candidatepicture: <img src={`data:image/jpeg;base64,${item.candidatepicture}`} width={70}  height={70}/>,
                        email: item.email,
                        regnumber: `${item.reg_number == 'null' ? 'NTR' : item.reg_number}`,
                        faculty: item.faculty,
                        status: item.status, 
                        voteresult: item.vote_result,
                        roles: item.roles
                
                    }
                    return getdatas;
                })
                )
                console.log(result.data)
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
            Header: "Picture",
            accessor: "candidatepicture",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            },
        },

        {  
            Header: 'Candidate full name',  
            accessor: 'fullname',
            sortable: false,
            filterable: false,
        },
        {
            Header: "Run for",
            accessor: "roles",
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
            Header: "Candidate Result",
            accessor: "voteresult",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            },
        },

        
    ]  

    return (
        <>
            <h1 className="mainboxTitle">Vote stuation</h1>
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
        </>
    )
}

export default CandidateList;