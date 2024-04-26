const User = require('../models/User');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LoginController {
    async login(req, res){
        try {
            const { email, password } = req.body;
    
            //Search for the user by email
            const user = await User.findOne({ 
                where: { email:email } });
    
            //Verify if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            //Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, user.password);
    
            if (!match) {
                return res.status(401).json({ message: 'Invalid password' });
            }
    
            //Generate the JWT token
            const token = sign({ email: user.email, id: user.id }, 
                process.env.SECRET_JWT, { expiresIn: "1d" });
            return res.status(200).send({ token });
    
        } catch (error) {
            return res.status(400).send(
                {
                    message: "Failed to login",
                    cause: error.message
                });
        }
    }
}

module.exports = new LoginController()