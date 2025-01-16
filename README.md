# ALX Files Manager

## Description
The **ALX Files Manager** is a web-based file management application that allows users to manage and retrieve files. The project provides RESTful API endpoints for creating, retrieving, updating, and deleting files while incorporating user authentication and permissions. Additional features include image thumbnail generation, background job processing, and user onboarding email notifications.

## Features
1. **User Management**
   - User registration (`POST /users`)
   - User authentication (`GET /connect` and `GET /disconnect`)
   - Retrieve user profile (`GET /users/me`)

2. **File Management**
   - File upload and storage (`POST /files`)
   - Fetch file metadata (`GET /files/:id`)
   - Fetch file content (`GET /files/:id/data`)
   - Update file visibility (`PUT /files/:id/publish` and `PUT /files/:id/unpublish`)

3. **Thumbnails**
   - Automatic thumbnail generation for image files in various sizes (100px, 250px, 500px).

4. **Background Jobs**
   - Welcome email for new users.
   - Thumbnail generation using Bull queue.

5. **Error Handling**
   - Detailed error messages for unauthorized access, missing files, or invalid requests.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Background Jobs**: Bull (Redis-based queue system)
- **Image Processing**: image-thumbnail
- **Authentication**: Basic Authentication (Base64 encoding)
- **Testing**: Mocha and Chai
- **Miscellaneous**: MIME types (mime-types module)

## Endpoints
### Status and Stats
- **`GET /status`**: Check if Redis and MongoDB are running.
- **`GET /stats`**: Retrieve the number of users and files in the database.

### User Endpoints
- **`POST /users`**: Register a new user.
- **`GET /connect`**: Authenticate a user and return a token.
- **`GET /disconnect`**: Log out a user.
- **`GET /users/me`**: Get the authenticated user's details.

### File Endpoints
- **`POST /files`**: Upload a new file or folder.
- **`GET /files/:id`**: Retrieve file metadata by ID.
- **`GET /files/:id/data`**: Retrieve file content by ID.
- **`PUT /files/:id/publish`**: Make a file public.
- **`PUT /files/:id/unpublish`**: Make a file private.
- **`GET /files`**: List all files with pagination.

## Setup
### Prerequisites
- Node.js (v14+)
- MongoDB
- Redis

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jaddy001/alx-files_manager.git
   cd alx-files_manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB and Redis services.

4. Set environment variables in `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=27017
   DB_DATABASE=files_manager
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

5. Start the application:
   ```bash
   npm start
   ```

6. Start the worker for background jobs:
   ```bash
   npm run start-worker
   ```

## Usage
Use tools like Postman or cURL to interact with the API. Refer to the Endpoints section for detailed endpoint descriptions.

## Testing
1. Run unit tests:
   ```bash
   npm test
   ```

## Project Structure
```
├── controllers
│   ├── AppController.js
│   ├── FilesController.js
│   └── UsersController.js
├── routes
│   └── index.js
├── utils
│   ├── db.js
│   ├── redis.js
│   └── helpers.js
├── workers
│   └── worker.js
├── tests
│   ├── db.test.js
│   ├── redis.test.js
│   ├── endpoints.test.js
│   └── workers.test.js
├── .env
├── app.js
├── package.json
└── README.md
```

## Key Features in Detail
### Thumbnail Generation
- Uses the `image-thumbnail` library to generate thumbnails of sizes 100px, 250px, and 500px.
- Generated thumbnails are stored in the same directory as the original file.

### Background Jobs
- **Bull Queue**: Handles tasks asynchronously for performance optimization.
- **Welcome Email**: Simulates sending a welcome email upon user registration.

## Known Issues
- Ensure MongoDB and Redis are running before starting the application.
- Thumbnail generation only supports image file types.

## Authors
- [Jaddy(https://github.com/jaddy001)

## License
This project is licensed under the MIT License.

