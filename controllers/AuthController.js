import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const [email, password] = credentials;

    const user = await dbClient.db.collection('users').findOne({ email, password: sha1(password) });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const token = uuidv4();
    await redisClient.set(`auth_${token}`, user._id.toString(), 86400);

    res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}

