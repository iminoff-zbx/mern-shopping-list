const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');



const app = express();

// Body Parser Middleware
app.use(express.json());

// DB and Server config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true 
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    mongoose.set('useFindAndModify', false);
    
// Use Routes
app.use('/api/items', require('./routes/api/itemsRoute'));
app.use('/api/users', require('./routes/api/usersRoute'));
app.use('/api/auth', require('./routes/api/authRote'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

