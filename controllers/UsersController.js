const redisClient = require('../utils/redis');
const userCollection = require('../utils/db').usersCollection;

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        const hashedPassword = sha1(password);

        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Already exist' });
        }

        const newUser = await userCollection.insertOne({ email, password: hashedPassword });
        return res.status(201).json({ id: newUser.insertedId, email });
    }

    static async getMe(req, res) {
        const token = req.headers['x-token'];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const key = `auth_${token}`;
        const userId = await redisClient.get(key);

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await userCollection.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        return res.status(200).json({ id: user._id, email: user.email });
    }
}

module.exports = UsersController;

