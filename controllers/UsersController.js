class UsersController {
    static async postNew(req, res) {
        try {
            const { email, password } = req.body;

            // Validate email and password fields
            if (!email) {
                return res.status(400).json({ error: 'Missing email' });
            }
            if (!password) {
                return res.status(400).json({ error: 'Missing password' });
            }

            // Logic to handle user creation (example logic)
            console.log(`Received user data: email=${email}, password=${password}`);

            // Simulate user creation (replace with actual database logic)
            const newUser = { id: 1, email, password };

            // Send response
            return res.status(201).json({
                message: 'User created successfully',
                user: newUser,
            });
        } catch (err) {
            console.error('Error in postNew:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = UsersController;

