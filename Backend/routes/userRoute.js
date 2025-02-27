const express=require('express')
const { userModel}=require('../model/user.model')
const userRouter=express.Router()
userRouter.get('/profile',async(req,res)=>{
    const {userID}=req.body;
    try{
        const user=await userModel.find(userID)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json(user)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Server error"})
    }
})
module.exports=userRouter