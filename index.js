require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const videoRoutes = require('./routes/video');
const categoryRoutes = require('./routes/category');
const KEYS = require('./config/keys');

const app = express();

mongoose.connect(process.env.MONGODB_URI || KEYS.mongoURI, {useNewUrlParser: true, useFindAndModify: false}).then(() => {
    console.log("MongoDb");
}).catch((err) => {
    console.log(err)
});

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/api/video', videoRoutes);
app.use('/api/category', categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, (() => console.log(`Server started on port ${port}`)));

