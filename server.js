const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/itemsRoute');


const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// DB and Server config
const {mongoURI, PORT } = require('./config/configuration');

// Connect to Mongo
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

