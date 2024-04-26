const Course = require('../models/Course');
const errorMessages = require('../utils/errorMessages');

class CourseController {

    //Endpoint POST - Create course
    async create(req, res){
        try {
            const { name, duration } = req.body;
            
            const mustHave = {
                name: 'Enter the course name',
                duration: 'Course duration is required',
            };
    
            for (const [field, errorMessage] of Object.entries(mustHave)) {
                if (!req.body[field]) {
                    return res.status(400).json({ message: errorMessage });
                }
            }

            if (isNaN(duration) || duration < 20 || duration > 600) {
                return res.status(400).json({ message: 'Duration must be a valid number' });
            }
    
            const course = await Course.create(req.body);
            res.status(201).json(course);
        } catch (error) {
            res.status(500).json({ error: errorMessages.genericError });
        }
    }

    //Endpoint GET - List all courses
    async showAll(req, res) {
        try {
        const courses = await Course.findAll()
        res.json(courses)
    } catch (error) {
        res.status(500).json({ error: 'Uh-oh! Course cannot be listed!' });
    }
}

    //Endpoint GET - List course by ID 
    async showOne(req, res) {
        try {

            const { id } = req.params

            const course = await Course.findByPk(id)

        if (!course) {
            return res.status(404).json({ message: 'Sorry! Course not found!' });
        }

        res.json(course)

    } catch (error) {
        res.status(500).json({
            error: 'Sorry! Course not found!',
            error: error
        })
        }
    }

    //Endpoint GET - List course using filter
    async showFilter(req, res){
        try {
            let where = {};
        
            if(req.query.name) {
                where.name = { [Op.iLike]: `%${req.query.name}%` };
            }
    
            if (req.query.duration) {
                where.duration = { [Op.iLike]: `%${req.query.duration}%` };
            }
    
            const courses = await Course.findAll({ where });
        
            if (courses.length === 0) {
                throw new Error('Sorry! Course not found!');
        }
       
            res.json(courses);
        } catch (error) {
            res.status(404).json({ message: error.message} );
        }
    }

    //Endpoint PUT - Update course by ID
    async update(req, res){
        try {
            const { id } = req.params
    
            const course = await Course.findByPk(id)
    
            if (!course) {
                return res.status(404).json({ message: 'Sorry! Course not found!' });
        }
    
            await course.update(req.body);
    
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: errorMessages.genericError });
        }
    }

    //Endpoint DELETE - Remove course by ID
    async delete(req, res){
        try {
            const { id } = req.params
    
            const deletedCourseCount = await Course.destroy({
                where: {
                    id: id
                }
            });
    
            if (deletedCourseCount === 0) {
                return res.status(404).json({ message: 'Sorry! Course not found!' });
            }
    
            res.status(204).json({});
        } catch (error) {
            res.status(500).json({ error: errorMessages.genericError });
        }
    }
}

module.exports = new CourseController()
