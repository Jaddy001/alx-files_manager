// utils/redis.js
const redis = require('redis');
const client = redis.createClient(); // Create the Redis client
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.log('Error:', err);
});

module.exports = client;

