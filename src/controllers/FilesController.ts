// @ts-nocheck

const express = require('express')
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const crypto = require('crypto')

const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const methodOverride = require('method-override');
// const app = express();

const router = express.Router();

// MogoBD
const mognoUri ="mongodb://localhost:27017/mongo"
const connection = mongoose.createConnection(mognoUri);



// Grid FS
let gfs;
var db = connection.db
connection.once('open',()=>{
     gfs = Grid(connection.db,mongoose.mongo)

     gfs.collection('uploadFile')
    // gfsChunks = gfs.collection('mongo.chunks')
     
})


const storage = new GridFsStorage({
    url: mognoUri,
    file: (req, file,cb) => {
          console.log(`req`, req.file)
          console.log(`cb`, cb)
        console.log(`req.body.ref`, file)
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
        //   file.ref='604d5c030d537d5ac46b1ec4'
          const fileInfo = {
            filename: filename,
            bucketName: 'uploadFile',
            ref_id:'604d5c030d537d5ac46b1ec4'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });


// app.use(methodOverride('_method'))
// app.set('view engine','ejs');


// GET Route
router.get('/',(req,res)=>{
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          res.render('index', { files: false });
        } else {
          files.map(file => {
            if (
              file.contentType === 'image/jpeg' ||
              file.contentType === 'image/png'
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          res.render('index', { files: files });
        }
      });
})

// Post Files Routes
router.post('/upload',upload.single('file'),(req,res)=>{
//   console.log(`req ref`, req.body.ref)
    // res.json({file:req.file})
    // res.send(res)
    // res.redirect('/')

})

// Get Files 
router.get('/files',(req,res)=>{
   gfs.files.find().toArray((err,files)=>{
    //    Check if file exists
    if (!files || files.length === 0) {
        return res.status(404).json({
            err:"No files exist"
        })
    }
    // Files Exist
    return res.json(files)
   })
})

router.get('/files/:id',(req,res)=>{
  
    const fileread = gfs.createReadStream({
      _id: req.params.id
    });
    var bufferArray = [];
    console.log(`fileread`, fileread)
    fileread.on('data',function(chunk){  
    bufferArray.push(chunk);
});
fileread.on('end',function(){
    var buffer = Buffer.concat(bufferArray);
    let base64data = buffer.toString('base64');
    // let finalData =  'data:' + docs[0].contentType + ';base64,' 
    //       + fileData.join('');          
    // console.log(`base64data`, base64data)
    res.send(base64data)
    // deferred.resolve(base64data);
})
    console.log(`fileread`, fileread)
    // res.send(fileread)
})
 // Get Image by filename
router.get('/image/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if (!file || file.length === 0) {
            return res.status(404).json({
                err:"No file exist"
            })
        }

        // Check file format
        if (file.contentType ==='image/jpeg' || file.contentType === 'image/png') {
              const readstream = gfs.createReadStream(file.filename);
              var bufferArray = [];
              // console.log(`fileread`, readstream)
              readstream.on('data',function(chunk){  
              bufferArray.push(chunk);
          });
          readstream.on('end',function(){
              var buffer = Buffer.concat(bufferArray);
              let base64data = buffer.toString('base64');
              // let finalData =  `data:${file.contentType};base64,${base64data}`;          
              // console.log(`base64data`, base64data)
              res.send(base64data)
              // deferred.resolve(base64data);
          })
        }else{
            res.status(404).json({
               err: 'not an image'
            })
        }
    })
 })


export default router;