const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const mainRouter = require('./router/index');

app.use('/api', mainRouter);

app.use((err, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Server error!');
});

module.exports = app;