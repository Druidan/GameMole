//Establish our dependancies
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

// Express
const app = express();
const PORT = process.env.PORT || 3050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(routes);

// Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
}).catch(function (err) {
    console.log("We've got a problem, captain!")
    console.log(err);
});;




//I liked the look of Geoff's port notification, so I stoooole it.
app.listen(PORT, () => {
	console.log(`==> 🌎  Listening on port ${PORT}.`);
});