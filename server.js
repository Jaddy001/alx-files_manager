import express from 'express';
import router from './routes/index.js'; // Add `.js` to the file path for ES modules

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the router for all routes
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

