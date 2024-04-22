const { Router, query } = require('express'); 
const Explorer = require('../models/Explorer');
const bcrypt = require('bcrypt');
const { auth } = require('../middlewares/auth');

const explorerRoutes = new Router();

// Endpoint POST - Cadastrar (rota pública)
explorerRoutes.post('/', async (req, res) => {
    try {
        const requiredFields = {
            name: 'Ops! Name is mandatory',
            email: 'Please, enter an email',
            phone: 'Please, enter a phone number',
            birthday: 'Please, enter a birthday date',
            address: 'Please, enter an address',
            city: 'Ops! City is mandatory',
            password: 'Ops! Password is mandatory',
            profile: 'Ops! Profile is mandatory'
        };

        for (const [field, errorMessage] of Object.entries(requiredFields)) {
            if (!req.body[field]) {
                return res.status(400).json({ message: errorMessage });
            }
        }

        if (!req.body.birthday.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ message: 'Ops! Use a valid format YYYY-MM-DD to register the birthday.' });
        }

        const { name, email, phone, birthday, address, city, password, profile } = req.body;
        
        // Incluindo hash para senha em novo cadastro
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const explorer = await Explorer.create({
            name: name,
            email: email,
            phone: phone,
            birthday: birthday,
            address: address,
            city: city,
            password: hashedPassword,
            profile: profile
        });

        res.status(201).json(explorer);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Uh-oh! Something went wrong when trying to add a new explorer.' });
    }
});

//Endpoint GET - Listar (requer autenticação)
explorerRoutes.get('/', auth, async (req, res) => {
    const explorers = await Explorer.findAll()
    res.json(explorers)
})

//Endpoint GET - Listar por ID (requer autenticação)
explorerRoutes.get('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params

        const explorer = await Explorer.findByPk(id)

        if (!explorer) {
            return res.status(404).json({ message: 'Sorry! Explorer not found!' });
        }

        res.json(explorer)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Sorry! Explorer not found!',
            error: error
        })
    }
});

//Endpoint PUT - Atualizar por ID (requer autenticação)
explorerRoutes.put('/:id', auth, async (req, res) => {
    const explorerId = req.params.id;
    const data = req.body;

    try {
        const explorer = await Explorer.findByPk(explorerId);

        if (!explorer) {
            return res.status(404).json({ message: 'Sorry! Explorer not found!' });
        }

        Object.assign(explorer, data);

        await explorer.save();

        res.status(200).json({ message: 'Hooray! Successful update' });

    } catch (error) {
        res.status(500).json({ error: 'Uh-oh! Something went wrong when trying to add a new explorer' });
    }
});

//Endpoint DELETE - Excluir por ID (requer autenticação)
explorerRoutes.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    const explorer = await Explorer.findByPk(id);

    if (!explorer) {
        return res.status(404).json({ message: 'Sorry! Explorer not found!' });
    }

    await explorer.destroy();

    return res.status(204).json({});
});

module.exports = explorerRoutes