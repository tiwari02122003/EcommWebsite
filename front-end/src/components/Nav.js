import React,{useEffect} from "react";
import {Link,useNavigate} from "react-router-dom"
const Nav =()=>{
    let auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/singup');
    }
    

    return(
        <div>
            <img alt="logo"  className="logo" src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png"></img>
            {auth ? 
                <ul className="nav-ul">

                    <li><Link to= "/">Home</Link></li>
                    <li><Link to= "/product">Products</Link></li>
                    <li><Link to= "/add">Add Products</Link></li>
                    
                    <li><Link to= "/profile">Profile </Link></li>
                    <li><Link onClick={logout} to="/singup">Logout - {JSON.parse(auth).name}</Link></li> 
                </ul>
                : <ul className="nav-ul nav-right">
                    <li><Link to="/singup">Register</Link></li>
                    <li><Link to= "/login">Login </Link></li>
                </ul>
        
        
            }


        </div>
    )
}

export default Nav;
