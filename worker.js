const Bull = require('bull');
const imageThumbnail = require('image-thumbnail');
const path = require('path');
const fs = require('fs');
const File = require('../models/File'); // Adjust the path to your model

// Create the queue for file processing
const fileQueue = new Bull('fileQueue');

// Process the fileQueue
fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;

  if (!fileId) throw new Error('Missing fileId');
  if (!userId) throw new Error('Missing userId');

  const file = await File.findById(fileId);
  if (!file || file.userId !== userId) throw new Error('File not found');

  if (file.type !== 'image') throw new Error('Invalid file type');

  const filePath = path.join(__dirname, '../files', file.name);
  if (!fs.existsSync(filePath)) throw new Error('File not found');

  // Generate thumbnails
  const sizes = [100, 250, 500];
  for (const size of sizes) {
    try {
      const thumbnail = await imageThumbnail(filePath, { width: size });
      const thumbnailPath = path.join(__dirname, '../files', `${file.name}_${size}`);
      fs.writeFileSync(thumbnailPath, thumbnail);
    } catch (err) {
      throw new Error(`Error generating thumbnail for size ${size}`);
    }
  }

  console.log(`Thumbnails created for file ${file.name}`);
});

module.exports = fileQueue;

