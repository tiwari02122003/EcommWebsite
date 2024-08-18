const React = require('react');
const { useState, useEffect } = React;
const { useNavigate } = require('react-router-dom');



const SingUp=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate =useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[navigate])

    const collectData=async ()=>{
        console.warn(name,email,password);
        //fetching api . we can do it by fetch() method or by using axios
        let result=await fetch('http://localhost:5000/register',{
            method:'post' ,
            body: JSON.stringify({name,email,password}),
            headers: {
                'content-type' : 'application/json'
            },
        });
        result=await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result){
            navigate('/');
        }

    }



    



    return(
        <div className="register">
            <h1>Register</h1>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="inputBox" type="text" placeholder="Enter Name" />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="inputBox" type="text" placeholder="Enter email" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="inputBox" type="password" placeholder="Enter Password" />
            <button onClick={collectData} className="appbutton" >Sign Up</button>
        </div>
    )
}

export default SingUp;