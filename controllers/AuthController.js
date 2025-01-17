import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis.js';

class AuthController {
    static async getConnect(req, res) {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

        const [email, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
        
        const user = await dbClient.collection('users').findOne({ email, password: hashedPassword });
        
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        const token = uuidv4();
        
        await redisClient.set(`auth_${token}`, user._id.toString(), 86400); // Store for 24 hours
        
        res.status(200).json({ token });
    }

    static async getDisconnect(req, res) {
        // Implementation for disconnecting user
    }

    static async getMe(req, res) {
       // Implementation for retrieving user info based on token
    }
}

export default AuthController;

