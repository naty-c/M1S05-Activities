const User = require('../models/User');
const bcrypt = require('bcryptjs');
const errorMessages = require('../utils/errorMessages');

class UserController {

    // Endpoint POST - Create users: students and teachers (public route)
   async create(req, res){
        try {
            const requiredFields = ['name', 'email', 'password', 'birthday', 'phone', 'profile'];
            const missingField = requiredFields.find(field => !req.body[field]);

            if (missingField) {
                return res.status(400).json({ message: `Oops! ${missingField} is required` });
            }
    
            if (!req.body.birthday.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'Ops! Use a valid format YYYY-MM-DD for the birthday.' });
            }
    
            const { name, email, password, birthday, phone, profile } = req.body;
            
            // Include hash for password for new register
            const hashedPassword = await bcrypt.hash(password, 8);
    
            const user = await User.create({
                name, email, password: hashedPassword, birthday, phone, profile
            });
    
            res.status(201).json(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: errorMessages.genericError });
        }
    }

    //Endpoint GET - List all users (require autentication)
    async showAll(req, res) {
        try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Uh-oh! User cannot be listed!' });
    }
    }

    //Endpoint GET - List user by ID (require autentication)
    async showOne(req, res) {
    try {

        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: 'Sorry! User not found!' });
        }

        res.json(user)

    } catch (error) {
        res.status(500).json({
            error: 'Sorry! User not found!',
            error: error
        })
        }
    }

    //Endpoint PUT - Update user by ID (require autentication)
    async update(req, res) {
        const user_id = req.params.id;
        const data = req.body;
    
        try {
            const user = await User.findByPk(user_id);
    
            if (!user) {
                return res.status(404).json({ message: 'Sorry! User not found!' });
            }
    
            Object.assign(user, data);
    
            await user.save();
    
            res.status(200).json({ message: 'Hooray! Successful update' });
    
        } catch (error) {
            res.status(500).json({ error: errorMessages.genericError });
        }
    }

    //Endpoint DELETE - Remove user by ID (require autentication)
    async delete(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);
    
        if (!user) {
            return res.status(404).json({ message: 'Sorry! User not found!' });
        }
    
        await user.destroy();
    
        return res.status(204).json({});
    }
}

module.exports = new UserController()