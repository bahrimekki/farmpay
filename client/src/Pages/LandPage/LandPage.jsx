import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LandPage.css";
function LandPage() {
    return (
        <div className="LandPage">
            <div className="Left">
                <div className="header">
                    <h1>Save more and Get More</h1>
                    <p>Get collateral free financing for ypur farm</p>
                </div>
                <ul className="main">
                    <li>
                        <FontAwesomeIcon
                            icon={"caret-right"}
                            className="caret-right"
                        />
                        Cooperative savings account
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={"caret-right"}
                            className="caret-right"
                        />
                        Scamless loan application
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={"caret-right"}
                            className="caret-right"
                        />
                        Flexible repayment model
                    </li>
                </ul>
                <a href="#" className="bottom">
                    Get started
                </a>
            </div>
            <div className="Right">
                <img src="./assets/images/Mobile.png" alt="iPhone" />
            </div>
        </div>
    );
}

export default LandPage;
