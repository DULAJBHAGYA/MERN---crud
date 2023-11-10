const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//import routes
const postRoutes = require('./Routes/posts');

//import middleware
app.use(bodyParser.json());

app.use(postRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://dulajupananda:Dbu1998@cluster0.3rv76mp.mongodb.net/';

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error', err));

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
})