// We’ll declare all our dependencies here
const bodyParser = require('body-parser');
const bucketlist = require('./controllers/bucketlist');
const config = require('./config/database');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

// Connect mongoose to our database
mongoose.connect(config.database);

const port = 3000;

//Initialize our app variable
const app = express();

//Declaring Port


//Middleware for CORS
app.use(cors());

app.use(morgan('combined'))
    //Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Invalid page");
})


//Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/bucketlist', bucketlist);

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});