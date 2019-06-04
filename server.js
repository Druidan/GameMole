//Establish our dependancies
const express = require('express');
// const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

// Express
const app = express();
const PORT = process.env.PORT || 3050;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));
app.use('/', routes);



// // Handlebars.
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

//This get request was originally written by Maison Moa - Source: "https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61"
app.get('/express_backend', (req, res) => {
    res.send({
        express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
    });
})

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://<user>:<moleymoleymoley10>@ds143326.mlab.com:43326/heroku_0r9tgt25';
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