const mongoose = require("mongoose");
mongoose.set('debug', true);

const FileSchema = new mongoose.Schema({
  
  length: {
    type: Number,
    required: true
  },

  chunkSize: {
    type: Number,
    required: true
  },

  uploadDate: {
    type: Date,
    required: true
  },

  filename: {
    type: String,
    required: true
  },

  md5: {
    type: String,
    required: true
  },

  contentType: {
    type: String,
    required: true
  },

}, {collection: 'uploads.files'});

const File = mongoose.model('File', FileSchema);

module.exports = File;