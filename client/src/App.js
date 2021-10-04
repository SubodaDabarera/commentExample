import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Products from "./components/body/products/Products";
import DetailProduct from "./components/body/detailProduct/detailProduct";
import SignInScreen from './components/utils/signIn/SignInScreen';
import { useState, useParams, useEffect } from 'react';
import AdminProduct from './components/body/admin/AdminProduct';
import AdminProductMain from './components/body/admin/AdminProductMain';
import './components/utils/Header.css'




function App() {

  const [userInfo, setUserInfo] = useState((localStorage.getItem("userInfo")))
  const [userRole, setUserRole] = useState((localStorage.getItem("userRole")))  //######################################
  const [AdminButton, setAdminButton] = useState(false)
  const [adminView, setAdminView] = useState(false)


  const signoutHandler = () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("userRole")
    window.location.reload(false);
  }

  // setUserRole("Admin")

  if(localStorage.getItem("userInfo"))
    console.log(localStorage.getItem("userInfo").replaceAll('"', ''))

  console.log(localStorage.getItem("userRole"))

  if(localStorage.getItem("userRole") == "false"){
      localStorage.removeItem("userRole")
      setUserRole(null)
  }
     
  const HandleAdminButton =( ) =>{
    setAdminButton(true)
  } 
    
  useState(() => {
    if(window.location.href == 'http://localhost:3000/admin'){
      setAdminView(true)
      console.log("URL is true")
      
    }else{
      setAdminView(false)  
    }
  }, [])
  
  console.log(window.location.href)

  return (
    <Router>
      <div>
 
        {/* starting of the nav bar */}

            <div className="topnav">

              <Link to = "/" style = {{marginLeft: "20px", marginTop: "5px"}} className = "rightAlighName">Home </Link> 
              {
                userInfo ? 
                <>
                  <Link to = "/signin"  className = "logInTopBar" style = {{marginRight: "20px", width: "80px", color: "#3d83dd"}} onClick = {signoutHandler}>Sign Out </Link> 

                  { userRole ?
                       <Link to = "/admin"  className = "logInTopBar" style = {{color: "#3d83dd"}} onClick = {HandleAdminButton}>Admin </Link> 
                    :null
                  }
                 
                </>
                :
                <Link to = "/signin"  className = "logInTopBar" style = {{marginRight: "20px", width: "70px", color: "#3d83dd"}}>Sign in </Link> 
              }
             
            </div>
            {/* End of the nav bar */}

            {/* start admin sidebar */}
            {/* {
              window.location.href === 'http://localhost:3000/admin' ?

                <div style = {{backgroundImage: "none", backgroundColor: "white"}}>

                  <AdminProductMain ></AdminProductMain>

                </div>


                : window.location.reload(false)

            } */}
           
            {/* end admin sidebar */}

        
          <div className="App">

            <Route path = "/" component = {Products} exact/>
            <Route path = "/signin" component = {SignInScreen} /> 
            <Route path = "/product/:id" component = {DetailProduct} exact/>
            <Route path = "/admin" component = {AdminProductMain} /> 
          
          </div>
      </div>
    </Router>
  );
}  

export default App;
