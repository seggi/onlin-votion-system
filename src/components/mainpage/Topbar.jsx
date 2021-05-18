import { Component } from "react";
import React from "react";
import { Link, Route } from "react-router-dom";
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faBell, faSignOutAlt, faCogs} from "@fortawesome/free-solid-svg-icons";


library.add( faBars, faBell, faSignOutAlt, faCogs);


class BarsButton extends Component {
    constructor(props) {
        super(props);
        this.handleBarClick = this.handleBarClick.bind(this);
    }

    componentDidMount() {
        this.handleBarClick();
    }

    handleBarClick() {
        $(".wrapper").toggleClass("collapse")
    }

    render() {
        return (
            <div className="sidebar-btn"
                onClick={ this.handleBarClick }
                >
                <FontAwesomeIcon icon="bars" />
            </div>
        )
    }
    
}

class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { appName, username, authlogin } = this.props;
        return (
            <>
                <div className="header">
                    <div className="header-menu">
                        <div className="title">
                        O.V.S
                        </div>
                        <BarsButton appName={appName}/>
                        
                        <ul>
                            <>
                                <li><span>{username}</span></li>
                                {/* <li><a href="#"><FontAwesomeIcon icon={['fas', 'bell']} /></a></li> */}
                                <li><Link to="/login">
                                        <FontAwesomeIcon icon={["fas", "sign-out-alt"]}>
                                        </FontAwesomeIcon>
                                    </Link>
                                </li>
                            </>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default TopBar;
