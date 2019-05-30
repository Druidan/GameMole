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
    axios.all([
        axios.get('https://www.ign.com/articles?tags=news'),
        axios.get('https://www.gameinformer.com/news'),
        axios.get('https://www.destructoid.com/')
    ])
    .then(axios.spread( (ignResponse, giResponse, destResponse) => {
        const ign$ = cheerio.load(ignResponse.data);
        const gi$ = cheerio.load(giResponse.data);
        const dest$ = cheerio.load(destResponse.data);

        ign$('div.listElmnt').each( (i, element) => {
            const ignResult = {};

            ignResult.title = ign$(element)
                .find('div.listElmnt-blogItem')
                .find('a.listElmnt-storyHeadline')
                .text();
            ignResult.link = ign$(element)
                .find('div.listElmnt-blogItem')
                .find('a.listElmnt-storyHeadline')
                .attr('href');
            ignResult.source = 'IGN';
            sum = ign$(element)
                .find('p')
                .text()
                .match(/(?<=-)[\s\S]*(?=Read)/g);
            ignResult.summary = sum.join('').trim();
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

        gi$('article.node--type-article').each( (i, element) => {
            const giResult = {};

            giResult.title = gi$(element)
                .find('span.field--name-title')
                .text();
            giResult.link = gi$(element)
                .find('h2.page-title')
                .find('a')
                .attr('href');
            giResult.source = 'Game Informer';
            giResult.summary = gi$(element)
            .find('div.field--name-field-promo-summary')
            .text();
            console.log(giResult);
        })

        dest$('article.smlpost').each( (i, element) => {
            const destResult = {};

            destResult.title = dest$(element)
                .find('h2.sparticle_title')
                .find('a')
                .text();
            const newLink = dest$(element)
                .find('h2.sparticle_title')
                .find('a')
                .attr('href');
            destResult.link = `https://www.destructoid.com/${newLink}`;
            destResult.source = 'Destructoid';
            destResult.summary = dest$(element)
                .find('p')
                .text();
            console.log(destResult)
        })


        res.send('IGN sucessfully scrapped, captain!\nGame Informer perfectly pillaged, captain!\nDestructoid ravenously raided, captain!');
    })).catch(function (err) {
        console.log("We've got a problem, captain!")
        console.log(err);
    });
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
