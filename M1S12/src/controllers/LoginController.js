const Explorer = require('../models/Explorer');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginController {
    async login(req, res){
        try {
            const { email, password } = req.body;
    
            // Procura o usuário pelo email
            const explorer = await Explorer.findOne({ 
                where: { email:email } });
    
            // Verifica se o usuário foi encontrado
            if (!explorer) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Compara a senha fornecida com a senha hash armazenada
            const match = await bcrypt.compare(password, explorer.password);
    
            if (!match) {
                return res.status(401).json({ message: 'Invalid password' });
            }
    
            // Gera o token JWT
            const token = sign({ email: explorer.email, id: explorer.id }, 
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

module.exports = new LoginController();