const express =require('express');
const mongoose=require('mongoose')
const app=express()
const PORT=9000 
const mongoURL="mongodb+srv://Jannat:jannat10175168@jannat.5n3xo.mongodb.net/EcomDB";
let connection=mongoose.connect(mongoURL)
app.get("/ping",(req,res)=>{
    res.send("hi");
})
app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("successfully connected")
    }
    catch(error){
        console.log(error)
    }
    console.log("yey")
})