const User = require("../models/User");
const Course = require('../models/Course');
const Enrollment = require("../models/Enrollment");

class EnrollmentController {

    async create(req, res) {
        try {
            const { user_id, course_id } = req.body;

            // Verify if user is a student
            const student = await User.findOne({ where: { 
                id: user_id, profile: 'student' } });
           if (!student) {
               return res.status(404).json({ message: 'Not a student' });
           }

            // Verify if user_id and course_id were provided
            if (!user_id || !course_id) {
                return res.status(400).json({ message: 
                    'Student ID and Course ID are required' });
            }

            // Verify if the student exists
            const existingStudent = await User.findByPk(user_id);
            if(!existingStudent) {
                return res.status(404).json({message: 'Student not found'});
            }

            // Verify if the course exists
            const course = await Course.findByPk(course_id);
            if(!course) {
                return res.status(404).json({message: 'Course not found'});
            }

            // Verify if the student is already enrolled
            const existingEnrollment = await Enrollment.findOne({ where: { 
                user_id, course_id }});
            if (existingEnrollment) {
                return res.status(409).json({message: 
                    'Student is already enrolled in this course'});
            }

            // Register the enrollment
            const enrollment = await Enrollment.create({ 
                user_id, course_id });
            res.status(201).json(enrollment);
        } catch (error) {
            res.status(500).json({message: 'Ops! Error when trying to register enrollment'});
        }
    }
}

module.exports = new EnrollmentController();