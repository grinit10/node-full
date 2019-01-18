const express = require('express');
const joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const dotenv = require('dotenv');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')

app.set('view engine', 'pug');
app.set('views', './views'); //Setting default template folder

dotenv.config({
    path: '.env'
})

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}

app.use((req, resp, next) => {
    startupDebugger(`Running in ${process.env.NODE_ENV}`);
    dbDebugger('This is a Db dubugger');
    next();
});

app.use('/api/courses', courses);
app.use('/', home);

console.log(`Application name: ${config.get('name')}`)

const schema = {
    name: joi.string().min(3).required()
}

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});