import React ,{useState} from "react";

const AddProduct=()=>{

    const [name,setName] =useState("");
    const [price,setPrice] =useState("");
    const [category,setCategory] =useState("");
    const [company,setCompany] =useState("");
    const [error,setError]=useState(false);

    const handleChange= async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result= await fetch("http://localhost:5000/add-item",{
            method:'post' ,
            body: JSON.stringify({name,price,category,company,userId}),
            headers: {
                'content-type' : 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },

        });
        result=await result.json();
        console.log(result);

        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    }


    return(
        <div className="addProduct">
            <h1>Add Product</h1>
            <input type="text" placeholder="enter Product name" className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            {error && !name && <span className="invalid-field">Enter a valid name</span>}
            <input type="text" placeholder="enter Product Price" className="inputBox" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            {error && !price && <span className="invalid-field">Enter the Price</span>}
            <input type="text" placeholder="enter Product Category" className="inputBox" value={category} onChange={(e)=>{setCategory(e.target.value)}}></input>
            {error && !category && <span className="invalid-field">Enter a category</span>}
            <input type="text" placeholder="enter Product company" className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>
            {error && !company && <span className="invalid-company-field">Enter a company name</span>}
            <button className="appbutton"  onClick={handleChange}>Add Product</button>
        </div>
    );
}

export default AddProduct;