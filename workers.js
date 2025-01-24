import Bull from 'bull';
import imageThumbnail from 'image-thumbnail';
import { File } from './models'; // Assuming you have a model for File

const fileQueue = new Bull('fileQueue', 'redis://127.0.0.1:6379'); // Assuming Redis is running locally

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;
  
  if (!fileId) throw new Error('Missing fileId');
  if (!userId) throw new Error('Missing userId');

  const file = await File.findOne({ _id: fileId, userId });

  if (!file) throw new Error('File not found');

  // Generate thumbnails with different sizes
  const sizes = [500, 250, 100];
  for (const size of sizes) {
    try {
      const thumbnail = await imageThumbnail(file.path, { width: size });
      const thumbnailPath = `${file.path}_${size}`;
      // Save thumbnail to the same location
      fs.writeFileSync(thumbnailPath, thumbnail);
    } catch (err) {
      console.error(`Error generating thumbnail for size ${size}:`, err);
    }
  }
});

// Export fileQueue
export default fileQueue;

