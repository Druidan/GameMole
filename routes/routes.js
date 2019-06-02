// Establish our Express Dependancy
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

// Bring in the database models
const db = require('../models');

//Create our routes and set up logic where required.

//-------------------------------------

//Scraper Router
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
        let allResults = {};

        ign$('div.listElmnt').each( (i, element) => {
            i = i+1;
            const ignResult = {};
            ignResult[`ignArticle ${i}`] = {};
            ignResult[`ignArticle ${i}`].title = ign$(element)
                .find('div.listElmnt-blogItem')
                .find('a.listElmnt-storyHeadline')
                .text();
            ignResult[`ignArticle ${i}`].link = ign$(element)
                .find('div.listElmnt-blogItem')
                .find('a.listElmnt-storyHeadline')
                .attr('href');
            ignResult[`ignArticle ${i}`].source = 'IGN';
            ignResult[`ignArticle ${i}`].sourceRef = 'https://www.ign.com';
            ignResult[`ignArticle ${i}`].logo = 'IGNlogo.png';
            sum = ign$(element)
                .find('p')
                .text()
                .match(/(?<=-)[\s\S]*(?=Read)/g);
            ignResult[`ignArticle ${i}`].summary = sum.join('').trim();
            allResults = Object.assign(allResults, ignResult);
        });

        gi$('article.node--type-article').each( (i, element) => {
            i = i+1;
            const giResult = {};
            giResult[`giArticle ${i}`] = {};
            giResult[`giArticle ${i}`].title = gi$(element)
                .find('span.field--name-title')
                .text();
            giResult[`giArticle ${i}`].link = gi$(element)
                .find('h2.page-title')
                .find('a')
                .attr('href');
            giResult[`giArticle ${i}`].source = 'Game Informer';
            giResult[`giArticle ${i}`].sourceRef = 'https://www.gameinformer.com/';
            giResult[`giArticle ${i}`].logo = 'GIlogo.png';
            giResult[`giArticle ${i}`].summary = gi$(element)
            .find('div.field--name-field-promo-summary')
            .text();
            allResults = Object.assign(allResults, giResult);
        })

        dest$('article.smlpost').each( (i, element) => {
            i = i+1;
            const destResult = {};
            destResult[`destArticle ${i}`] = {};
            destResult[`destArticle ${i}`].title = dest$(element)
                .find('h2.sparticle_title')
                .find('a')
                .text();
            const newLink = dest$(element)
                .find('h2.sparticle_title')
                .find('a')
                .attr('href');
            destResult[`destArticle ${i}`].link = `https://www.destructoid.com/${newLink}`;
            destResult[`destArticle ${i}`].source = 'Destructoid';
            destResult[`destArticle ${i}`].sourceRef = 'https://www.destructoid.com/';
            destResult[`destArticle ${i}`].logo = 'Destlogo.png';
            destResult[`destArticle ${i}`].summary = dest$(element)
                .find('p')
                .text();
            if(destResult[`destArticle ${i}`].title !== ''){
                allResults = Object.assign(allResults, destResult);
            }            
        })

        res.json(allResults);
    })).catch(function (err) {
        console.log("We've got a problem, captain!")
        console.log(err);
    });
});

//-------------------------------------

//Find all articles saved in the database
router.get('/findSaved', function (req, res) {
    Article.selectAll(data => {
        console.log(data)
        res.json(data);
    })
    .catch(function (err) {
        console.log("We ran into a problem finding the saved articles, captain!")
        console.log(err);
    });
});

//-------------------------------------

//Save an article to the database
router.post('/saveArt', function (req, res) {
    db.Article.create(req.body)
    .then(dbArticle => {
        console.log(dbArticle);
        res.end();
    })
    .catch(function (err) {
        console.log("We've got a problem, captain! The save route failed!")
        console.log(err);
    });
});

//-------------------------------------

//Update an article with a new note



//-------------------------------------

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
