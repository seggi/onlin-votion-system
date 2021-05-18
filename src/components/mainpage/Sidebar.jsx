import React from 'react';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
    faBalanceScale, faShoppingCart, faShoppingBasket, faSatellite,
    faStore, faChevronDown, faCashRegister, faClipboardCheck, 
    faMoneyBill, faPeopleArrows, faLock, faLanguage, faInfoCircle,
    faMoneyCheck, faCog, faBook, faUser, faPersonBooth, faPeopleCarry, faCoins, faColumns,
    faVoteYea
 } from "@fortawesome/free-solid-svg-icons";
import { SidebarDatas } from './Sidebardatas';


library.add(faBalanceScale,
    faStore, faChevronDown, faClipboardCheck, 
    faPeopleArrows, faLock, faLanguage, faInfoCircle, faCoins,
    faMoneyCheck, faCog, faBook, faUser, faPersonBooth, faPeopleCarry, faColumns,
    faVoteYea
    );


function SideBar (props){

        return (
            <div className="sidebar">
                    
                <div className="sidebar-menu"> 
                    <li className="item" id="dashboard">
                        <a href="#dashboard" className="menu-btn" >
                            <label><FontAwesomeIcon icon="columns"></FontAwesomeIcon></label>
                            <span>DashBoard<FontAwesomeIcon icon="chevron-down" className="drop-down"></FontAwesomeIcon></span>
                        </a>
                        <div className="sub-menu">
                            <Link to="/main_page/dashboard" class="link-a">
                                <label><FontAwesomeIcon icon="people-arrows"></FontAwesomeIcon></label>
                                <span>Vote situation</span>
                            </Link>
                        </div>
                        <div className="sub-menu">
                            <Link to="/main_page/dashboard/validate_candidacy" class="link-a">
                                <label><FontAwesomeIcon icon="vote-yea"></FontAwesomeIcon></label>
                                <span>Validate Candidacy</span>
                            </Link>
                        </div>
                    </li>

                    <li className="item" id="settings">
                            <a href="#settings" className="menu-btn">
                                <label><FontAwesomeIcon icon="cog"></FontAwesomeIcon></label>
                                <span>{SidebarDatas.settingTitle.head1}<FontAwesomeIcon icon="chevron-down" className="drop-down"></FontAwesomeIcon></span>
                            </a>
                            <div className="sub-menu">
                                <Link to="#" class="link-a">
                                    <label><FontAwesomeIcon icon="lock"></FontAwesomeIcon></label>
                                    <span>{SidebarDatas.settingTitle.head2}</span>
                                </Link>
                            </div>
                        </li>

                        <li className="item">
                            <Link to="#" className="menu-btn">
                                <label><FontAwesomeIcon  icon="info-circle"></FontAwesomeIcon></label>
                                <span>{ SidebarDatas.infoTitle }</span>
                            </Link>
                        </li>
                </div>
            </div> 
        )
    
}

export default SideBar;