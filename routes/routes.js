// Establish our Express Dependancy
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

// Bring in the database models
const db = require('../models');

//Create our routes and set up logic where required.

//-------------------------------------

router.get('/scrape', function (req, res) {
    axios.get('https://www.ign.com/articles?tags=news').then(function (ignResponse) {
        const ign$ = cheerio.load(ignResponse.data);

        ign$('div.listElmnt').each(function (i, element) {
            const ignResult = {};

            ignResult.title = ign$(element)
                .find('a.listElmnt-storyHeadline')
                .text();
            ignResult.link = ign$(element)
                .find('a.listElmnt-storyHeadline')
                .attr('href');
            ignResult.source = 'IGN';
            sum = ign$(element)
                .find('p')
                .text().match(/(?<=-)(.*)(?=Read)/g);
            ignResult.summary = sum.join(' ').trim();
                console.log(ignResult)

            // db.Article.create(ignResult)
            //     .then(dbArticle => {
            //         console.log(dbArticle);
            //     })
            //     .catch(function (err) {
            //         console.log("We've got a problem, captain!")
            //         console.log(err);
            //     });
        });
        res.send('IGN sucessfully scrapped, captain!');
    }).catch(function (err) {
        console.log("We've got a problem, captain!")
        console.log(err);
    });

    // axios.get('https://www.gameinformer.com/').then(function (giResponse) {
    //     const gi$ = cheerio.load(giResponse.data);
    // });

    // axios.get('https://www.destructoid.com/').then(function (destResponse) {
    //     const dest$ = cheerio.load(destResponse.data);
    // });

});




// Export routes for server.js to use.
module.exports = router;






// // BURGER MUNCHER REFERENCE
// router.get('/', (req, res) => {

//     burger.selectAll(data => {
//         const handlebarsObj = {
//             burgers: data
//         };
//         res.render('index', handlebarsObj);
//     });

// });

// //-------------------------------------

// router.post('/api/burgers', (req, res) => {
//     const newBurger = req.body.name
//     burger.createBurger(newBurger, (result) => {
//         res.json({
//             id: result.insertId
//         });
//     });

// });

// //-------------------------------------

// router.put('/api/burgers/:id', (req, res) => {

//     const condition = `id = ${req.params.id}`;

//     burger.updateBurger({
//         munched: req.body.munched
//     }, condition, (result) => {
//         if (result.changedRows === 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });

// //-------------------------------------
// router.delete('/api/burgers/:id', (req, res) => {
//     const condition = `id = ${req.params.id}`;

//     burger.removeBurger(condition, (result) => {
//         if (result.affectedRows === 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });
