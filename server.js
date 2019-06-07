//Establish our dependancies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

// Express
const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/', routes);
if (process.env.NODE_ENV = 'development') {
    app.use(express.static('public'));
} else {
    app.use(express.static('build'));
}


//This get request was originally written by Maison Moa - Source: "https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61"
app.get('/express_backend', (req, res) => {
    res.send({
        express: 'Your Express backend is connected to React'
    });
})

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
}).catch(function (err) {
    console.log("We've got a problem with the database, captain!")
    console.log(err);
});




//I liked the look of Geoff's port notification, so I stoooole it.
app.listen(PORT, () => {
    console.log(`==> 🌎  Listening on port ${PORT}.`);
});