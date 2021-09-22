const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Course=require('../models/Course');
const User=require('../models/User');

router.put("/addscore", async (req, res) => {
  const userId=req.body.userId;
  const courseId=req.body.courseId;
  const score=req.body.score;
  const course_name=req.body.course_name;
  const category_name=req.body.category_name;
    User.findById(userId,function (err, result) {
        result.results.push({courseId:courseId,score:score,course_name:course_name,category_name:category_name,time:Date.now()})
        result.markModified('results');
        result.save()
        .then(()=>{
            res.status(200).json({message:"success", user:result})
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({message:"failure"})
        })        
    }
)
});

router.get("/getresult/:id",(req,res)=>{
    const userId=req.params.id;
    User.findById(userId,(err,user)=>{
        if(err){
            console.log(err)
            res.status(500).json({message:"failure"})
        }
        else{
            res.status(200).json({message:"success",results:user.results})
        }
    })
})



module.exports=router;