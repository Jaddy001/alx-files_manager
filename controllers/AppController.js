import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

class AppController {
  static async getStatus(req, res) {
    try {
      const status = {
        redis: redisClient.isAlive(),
        db: dbClient.isAlive(),
      };
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json({ message: 'Error checking status' });
    }
  }

  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      const stats = {
        users,
        files,
      };
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving stats' });
    }
  }
}

export default AppController;

