const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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

    mongoose.set('useFindAndModify', false);
    
// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

