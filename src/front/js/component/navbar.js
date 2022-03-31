import React from "react";
import { Link } from "react-router-dom";
//---> styles
import "../../styles/navbar.css";
import Logo from "../../img/logo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-black bg-black">
      <div className="container">
        <img className="navbar-brand" src={Logo} />
     

      
      </div>
    </nav>
  );
};
