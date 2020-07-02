const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const fileModel=require('../models/fileSchema');

const app = express.Router();

// Middleware
app.use(bodyParser.json());

// Mongo URI
const mongoURI = "mongodb+srv://[USERNAME]:[PASSWORD]@cluster0-p4slr.mongodb.net/[DATABSE NAME]?retryWrites=true&w=majority";

// Create mongo connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const conn = mongoose.createConnection(mongoURI);

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'Connection Error'));

let gridFSBucket;
conn.once('open', async () => {
    gridFSBucket = await new mongoose.mongo.GridFSBucket(conn.db, {bucketName: '[YOUR BUCKET NAME]'}); 
})

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve) => {
        let userfile = req.body.filename;
        const fileInfo = {
          filename: userfile,
          bucketName: '[YOUR BUCKET NAME]'
        };
        resolve(fileInfo);
    });
  }
});
const upload = multer({ storage : storage});

//File Upload
app.post('/', upload.single('file'), (req, res) => {
  res.send("File Uploaded Successfully");
});

//File Download
app.get('/', (req, res) => {
  let contentType;
  let filename = req.query.file.toString();
  fileModel.find({filename: filename}).then((file)=>{
    
    contentType=file[0].contentType;
    //setting response header
    res.set({
      "Accept-Ranges": "bytes",
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Type": `${contentType}`
    });
    
    const readstream = gridFSBucket.openDownloadStreamByName(filename);
    readstream.pipe(res);
  })
});  

module.exports = app;