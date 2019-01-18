const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: "Course1" },
    { id: 2, name: "Course2" },
    { id: 3, name: "Course3" },
]

router.get('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    course ? res.send(course) : res.status(404).send(`Course with id ${req.params.id} is not found`);
});

router.post('/', (req, res) => {
    validateCourse(req.body, schema, res);
    courses.push({
        id: ++courses.length,
        name: req.body.name
    });
    res.status(201).send(`New collection created with id ${courses.length}`);
});

router.put('/:id', (req, res) => {
    validateCourse(req.body, schema, res);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    course ? '' : res.status(404).send(`Course with id ${req.params.id} is not found`);
    course.name = req.body.name;
    res.status(200).send(`The collection with id ${req.params.id} is updated`);
});

router.delete('/:id', (req, res) => {
    const courseindex = courses.indexOf(c => c.id === parseInt(req.params.id));
    courseindex >= 0 ? courses.filter(c => c.id !== req.params.id) : res.status(404).send(`Course with id ${req.params.id} is not found`);
    res.status(200).send(`The collection with id ${req.params.id} is deleted`);
});

const validateCourse = (object, schema, res) => {
    const { error } = joi.validate(object, schema);
    error ? res.status(400).send(error.message) : '';
}

module.exports = router;