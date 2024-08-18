import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user'); 
        if(auth){
            navigate('/');
        }
    },[])
    const handleLogin=async ()=>{
        console.log("email,password");
        let result= await fetch("http://localhost:5000/login",{
            method:'post' ,
            body: JSON.stringify({email,password}),
            headers: {
                'content-type' : 'application/json'
            },

        });

        result=await result.json();
        console.warn(result);
        if(result.auth){  //we use auth here as the jwt token wala part,name comes under the user so now we send the auth 
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert("please Enter the correct email");
        }

    }

    return(
        <div className="login">
            <h1>Login</h1>
            <input value={email} onChange ={(e)=>setEmail(e.target.value)} className="inputBox" type="text" placeholder="Enter email" />
            <input  value={password} onChange ={(e)=>setPassword(e.target.value)} className="inputBox" type="password" placeholder="Enter Password" />
            <button  onClick={handleLogin} className="appbutton" >Login</button>
        </div>
    );
}
export default Login;