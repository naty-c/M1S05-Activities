const { Router, query } = require('express');
const Area = require('../models/Area');

const areaRoutes = new Router();

//Endpoint POST - Cadastrar
areaRoutes.post('/', async (req, res) => {
    try {
        const mustHave = {
            name: 'Enter the destination name',
            address: 'Enter an address',
            city: 'Enter a city',
            state: 'Enter a state',
            contact: 'Ops! Contact info is required',
            opening_hours: 'Ops! Opening hours is required',
            price: 'Ops! Price is required'
        };

        for (const [field, errorMessage] of Object.entries(mustHave)) {
            if (!req.body[field]) {
                return res.status(400).json({ message: errorMessage });
            }
        }

        const area = await Area.create(req.body);
        res.status(201).json(area);
    } catch (error) {
        console.error('Error creating area:', error.message);
        res.status(500).json({ error: 'Uh-oh! Something went wrong when trying to add a new area.' });
    }
});

//Endpoint GET - Listar
areaRoutes.get('/',  async (req, res) => {
    try {
        let where = {};
    
        if(req.query.name) {
            where.name = { [Op.iLike]: `%${req.query.name}%` };
        }

        if (req.query.city) {
            where.city = { [Op.iLike]: `%${req.query.city}%` };
        }

        const areas = await Area.findAll({ where });
    
        if (areas.length === 0) {
            throw new Error('Sorry! Area not found!');
    }
   
        res.json(areas);
    } catch (error) {
        res.status(404).json({ message: error.message} );
    }
});

//Endpoint PUT - Atualizar
areaRoutes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const area = await Area.findByPk(id)

        if (!area) {
            return res.status(404).json({ message: 'Sorry! Area not found!' });
    }

        await area.update(req.body);

        res.json(area);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Uh-oh! Something went wrong when trying to update the area.' });
    }
});

//Endpoint DELETE - Excluir
areaRoutes.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deletedAreaCount = await Area.destroy({
            where: {
                id: id
            }
        });

        if (deletedAreaCount === 0) {
            return res.status(404).json({ message: 'Sorry! Area not found!' });
        }

        res.status(204).json({});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Uh-oh! Something went wrong when trying to delete the area.' });
    }
});

module.exports = areaRoutes