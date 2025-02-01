import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AuthController {
  // GET /connect : sign in
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Decode Base64 credentials (<email>:<password>)
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    if (!email || !password) return res.status(401).json({ error: 'Unauthorized' });

    const usersColl = dbClient.db.collection('users');
    const user = await usersColl.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const hashedPassword = crypto.createHash('sha1')
      .update(password)
      .digest('hex');
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Generate a new token and store it in Redis for 24 hours
    const token = uuidv4();
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 3600);
    return res.status(200).json({ token });
  }

  // GET /disconnect : sign out
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    await redisClient.del(key);
    return res.status(204).send();
  }
}

export default AuthController;

