const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const fileRoutes = require('./routes/file')
const app = express()
const port = 3000
const path = require('path');

require("dotenv").config();




//connect to database

try {
  mongoose.connect('mongodb+srv://mongodb:admin@project.3usro.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('Connected to Database')
} catch(err){
  handleError(err)
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message)
})

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(userRoutes);
app.use(fileRoutes);


app.listen(port, () => {
  console.log(`Server is live on port ${port}`)
})
