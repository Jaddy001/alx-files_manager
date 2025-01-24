// utils/worker.js
const Bull = require('bull');
const { imageThumbnail } = require('image-thumbnail');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const File = require('../models/File');
const User = require('../models/User');
const redisClient = require('./redisClient');

// Create Bull queues
const fileQueue = new Bull('fileQueue', {
  redis: { client: redisClient },
});

const userQueue = new Bull('userQueue', {
  redis: { client: redisClient },
});

// Process the fileQueue (image thumbnail generation)
fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  if (!fileId) throw new Error('Missing fileId');
  if (!userId) throw new Error('Missing userId');

  const file = await File.findOne({ _id: fileId, userId });
  if (!file) throw new Error('File not found');

  const filePath = path.join(__dirname, '..', 'uploads', fileId);

  const sizes = [500, 250, 100];
  sizes.forEach(async (size) => {
    try {
      const thumbnail = await imageThumbnail(filePath, { width: size });
      const thumbnailPath = `${filePath}_${size}`;
      fs.writeFileSync(thumbnailPath, thumbnail);
    } catch (error) {
      console.error(`Error generating thumbnail for size ${size}:`, error);
    }
  });

  console.log('Thumbnails generated for', fileId);
});

// Process the userQueue (send welcome email)
userQueue.process(async (job) => {
  const { userId } = job.data;

  if (!userId) throw new Error('Missing userId');

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  console.log(`Welcome ${user.email}!`);
  // In real life, you would send an email here using a service like Mailgun or SMTP
});

// Export the queues for use
module.exports = { fileQueue, userQueue };

