const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
const dbName = 'files_manager';

async function connectDB() {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    return client.db(dbName);
}

const dbPromise = connectDB();

module.exports = {
    usersCollection: dbPromise.then((db) => db.collection('users')),
};

