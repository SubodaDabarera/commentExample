
import { Router } from "express";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Header.css'




function Header() {

    const [userInfo, setUserInfo] = useState((localStorage.getItem("userInfo")))
    const [userRole, setUserRole] = useState((localStorage.getItem("userRole")))  //######################################

    const signoutHandler = () => {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("userRole")
        window.location.reload(false);
    }

    //DEFINE USER ROLE AS ADMINS
  

    return (
        
            <div>  
                
                <h2> HEllo </h2>  
                
            </div>
        
    )
    
}

export default Header