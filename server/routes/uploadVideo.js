const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Video=require('../models/Video');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

var date;

const storage1=multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,"./uploads/videos");
  },
  filename:(req,file,callback)=>{
    date=Date.now();
    callback(null,date+"_"+"video"+"_"+file.originalname);

  }
})
const storage2=multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,"./uploads/thumbnails");
  },
  filename:(req,file,callback)=>{
    callback(null,date+"_"+"thumbnail"+"_"+file.originalname);

  }
})

const upload1=multer({storage:storage1});
const upload2=multer({storage:storage2});

router.post("/video",upload1.single("videoFile"), async (req, res) => {
  
    console.log(req.file.path)
    const file_path = date+"_"+"video"+"_"+req.body.video_name;
    // Compression settings
    ffmpeg(file_path)
        .outputOptions('-c:v libx264')
        .outputOptions('-crf 20')
        .outputOptions('-preset veryfast') 
        .output(file_path)
        .on('end', () => {
            fs.unlinkSync(file_path);
            res.send('Compression complete');
        })
        .run();
  
    const newVideo = new Video({
      title:req.body.title,
      description:req.body.description,
      video_name:date+"_"+"video"+"_"+req.body.video_name,
      views:Math.floor(Math.random() * (2000 - 1000) + 1000),
      courseId:req.body.courseId,
      
    });
    newVideo
    .save()
    .then(()=>{
      res.status(200).json({message:"success",video:newVideo});
    })
    .catch((err)=>{
      res.status(500).json({message:"failure",error:err});
    });
    
});

router.post("/thumbnail",upload2.single("thumbnailFile"), async (req, res) => {

    console.log(req.file.path)

    Video.findById(req.body.videoId,function (err, result) {
    result.thumbnail_name=date+"_thumbnail_"+req.body.thumbnail_name
    result.markModified('thumbnail_name');
    result
    .save()
    .then(()=>{
      res.status(200).json({
        message:"success",
        video:result
      })
      console.log("success")
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({
        message:"failure",
        error:err
      })
    })
    
  }
  )
  .catch((err)=>{
    console.log(err)
  })
    
});





module.exports = router;
