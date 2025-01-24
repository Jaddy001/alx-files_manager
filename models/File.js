// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);
module.exports = File;

