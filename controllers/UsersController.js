import redisClient from '../utils/redis';

class UsersController {
  static async getMe(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    res.status(200).send({ id: user._id, email: user.email });
  }
}

export default UsersController;

