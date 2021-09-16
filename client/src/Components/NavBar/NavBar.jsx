import React from "react";
import "./NavBar.css";
function NavBar() {
    return (
        <div className="NavBar">
            <div className="Logo">
                <img src="./assets/images/logo.png" alt="logo" /> Farmpay
            </div>
            <ul className="list">
                <li className="active">
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Features</a>
                </li>
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
            <a href="#" className="LogIn">
                Login
            </a>
        </div>
    );
}

export default NavBar;
