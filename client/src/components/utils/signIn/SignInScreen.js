import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { store, useGlobalState } from "state-pool";
import { singIn } from "../FetchData";

import Topbar from "../sanduniSignIn/Topbar";
// import HeroSection from "../sanduniSignIn/HeroSection";

import './SignInScreen.css'


function SignInScreen(props) {
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userDetails, setUserDetails] = useState('')
   // const [GlobaluserDetails, setGlobaUserDetails] = useGlobalState("GlobalUserDetails")

    //const redirect = props.location.search? props.location.search.split('=')[1]: '/'
    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();   //this one is used for prevent page loading after submit it

        singIn('/api/users/signin', ({email, password}))
        .then(res => {
            
            localStorage.clear()
            localStorage.setItem("userInfo", JSON.stringify(res.data.name))
            localStorage.setItem("userRole", JSON.stringify(res.data.isAdmin))  //######################################
            setUserDetails(res.data)
           
            history.goBack(); //go back to previous page
           // window.location.reload(false);
           
           
           
        } )
        .catch(err => console.log(err.message))
        
    }

    console.log(localStorage.getItem("userRole"))

  
    
    // useEffect(() => {
    //     if(userDetails) {
    //         props.history.push(redirect);
    //     }
    // }, [props.history, redirect, userDetails])
    
    
    return(
        <div>
           
            <form className = "Signinform" 
            onSubmit={submitHandler}
            >

                <div>
                    <center>
                    <h1>Sign In</h1>
                    </center>
                </div>
                
                <div>
                    <label htmlFor = "email"> Email Address</label>
                    <input className = "inputfield" type= "email" id= "email" placeholder = "Enter Email" required 
                    onChange = {(e) => setEmail(e.target.value)}                            //get email from text input
                    ></input>
                </div>

                <div>
                    <label htmlFor = "password"> Password</label>
                    <input className = "inputfield" type= "password" id= "password" placeholder = "Enter Password" required 
                    onChange = {(e) => setPassword(e.target.value)}                            //get password from text input
                    ></input>
                </div>

                <div>
                    <label/>
                    <button className="primary" type= ""> Sign In</button>
                </div>
                <div>
                    <label/>
                    <div> 
                        New Customer? <Link to = "#"> Create new account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default SignInScreen;

