const express = require('express');
const joi =  require('joi');
const app= express();

app.use(express.json());

const schema = {
    name: joi.string().min(3).required()
}

const courses = [
    {id: 1, name: "Course1"},
    {id: 2, name: "Course2"},
    {id: 3, name: "Course3"},
]

app.get('/', (req, res) => {
    res.send('response from get')
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    course? res.send(course) : res.status(404).send(`Course with id ${req.params.id} is not found`);
});

app.post('/api/courses', (req, res) => {
    validateCourse(req.body, schema, res);
    courses.push({
        id: ++courses.length,
        name: req.body.name
    });
    res.status(201).send(`New collection created with id ${courses.length}`);
});

app.put('/api/courses/:id', (req, res) => {
    validateCourse(req.body, schema, res);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    course? '' : res.status(404).send(`Course with id ${req.params.id} is not found`);
    course.name = req.body.name;
    res.status(200).send(`The collection with id ${req.params.id} is updated`);
});

app.delete('/api/courses/:id', (req, res) => {
    const courseindex = courses.indexOf(c => c.id === parseInt(req.params.id));
    courseindex >= 0 ? courses.filter(c => c.id !== req.params.id) : res.status(404).send(`Course with id ${req.params.id} is not found`);
    res.status(200).send(`The collection with id ${req.params.id} is deleted`);
});

const validateCourse = (object, schema, res) => {
    const {error} = joi.validate(object, schema);
    error?  res.status(400).send(error.message): '';
}

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});