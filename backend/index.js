const express = require('express'); 
const cors  = require('cors');  
const app = express();
const Product=require('./db/products');
const Jwt =require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
// const port = 5000;
app.use(express.json());
const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/e-commerce');
const ProSchema = new mongoose.Schema({name:"string",email:"string",password:"string"});
const ProModel = mongoose.model('users',ProSchema);

const jwtKey=process.env.jwtKey;

app.get('',async(req,resp)=>{
     const res =  await ProModel.find();
     console.log(res);
     resp.send(res)
})



app.post("/register",async (req, res) => {
    let user = new ProModel(req.body);
    let result = await user.save();
    result=result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
      if(err){
        return res.send({result : 'Something went wrong,please try after some time'});
      }
      res.send({result,auth :token});
    })
  })   

app.post("/login",async (req,res)=>{
  if(req.body.password && req.body.email){
    let user  =await ProModel.findOne(req.body).select("-password");
  
    if(user){
      Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
          return res.send({result : 'Something went wrong,please try after some time'});
        }
        res.send({user,auth :token});
      })
    }else{
      res.send({result : 'user not found'});
    }
  }else{
    res.send({result: 'Not  found'});
  }

});

app.get("/products",verifyToken,async (req,res)=>{
  let product=await Product.find();
  if(product.length>0){
    res.send(product);
  }else{
    res.send({result:"No Product found"});
  }

});

app.post("/add-item",verifyToken,async (req,res)=>{
  let product = new Product(req.body);
  let result= await product.save();
  res.send(result)
});

app.delete("/product/:id",verifyToken,async(req,res)=>{
  const result=await Product.deleteOne({_id:req.params.id});
  res.send(result);
});

app.get("/product/:id",verifyToken,async(req,res)=>{
  const result=await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }else{
    res.send({result:"No result found"});
  }
});

app.put("/product/:id",verifyToken,async (req,res)=>{
  let result = await Product.updateOne({_id:req.params.id},{$set:req.body});
  res.send(result);
});

app.get("/search/:key",verifyToken,async (req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
    ]
  });
  if(result){
    res.send(result);
  }else{
    res.send({result:"No result found"});
  }
  
});
function verifyToken(req,res,next){  // the major difference betrween a function and a middleware is in middleware 3 arguments are passed
  let token= req.headers[`authorization`];
  if(token){
    token=token.split(' ')[1];
    Jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        res.status(401).send({result:"Please provide a valid token"});
      }else{
        
        next(); // here next is called so the it reaches back the the original functonality after authentication(token varification)
      }
    })
  }else{
    res.status(403).send({result:"Please add a token in the header"});
  }
}

app.listen(5000);


