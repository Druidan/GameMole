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
        axios.get('https://www.destructoid.com/'),
    ])
    .then(axios.spread( (ignResponse, giResponse, destResponse) => {
        const ign$ = cheerio.load(ignResponse.data);
        const gi$ = cheerio.load(giResponse.data);
        const dest$ = cheerio.load(destResponse.data);
        let allResults = {};
        let savedSummaries = [];

        const trueRes = res;

        return db.Article.find({})
            .then(res => {
                const savedArticles = res;
                for(let article in savedArticles){
                    savedSummaries.push((savedArticles[article].summary));
                }

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
                    if (!savedSummaries.includes(ignResult[`ignArticle ${i}`].summary)) {
                        allResults = Object.assign(allResults, ignResult);
                    }
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
                    if (!savedSummaries.includes(giResult[`giArticle ${i}`].summary)){
                        allResults = Object.assign(allResults, giResult);
                    }
                    
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
                    if (!savedSummaries.includes(destResult[`destArticle ${i}`].summary)) {
                        if(destResult[`destArticle ${i}`].title !== ''){
                            allResults = Object.assign(allResults, destResult);
                        }            
                    }
                })
        
                trueRes.json(allResults);

            })
            .catch(err => {
                console.log("We ran into problems getting saved titles!")
                console.log(err); 
            });
        })).catch(err => {
            console.log("We've got a problem with the scrape call, captain!")
            console.log(err);
        });
});

//-------------------------------------

//Find all articles saved in the database
router.get('/findSaved', function (req, res) {
    db.Article.find({})
        .populate('notes')
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("We ran into a problem finding the saved articles, captain!")
            console.log(err);
        });
});

//-------------------------------------

//Find all comments saved in the database
router.get('/findComments', function (req, res) {
    db.Note.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("We ran into a problem finding the comments, captain!")
            console.log(err);
        });
});

//-------------------------------------
//Save an article to the database
router.post('/saveArt', function (req, res) {
    db.Article.create(req.body)
    .then(dbArticle => {
        res.end();
    })
    .catch(err => {
        console.log("We've got a problem, captain! The save route failed!")
        console.log(err);
    });
});

//-------------------------------------

//Update an article with a new note
router.post('/makeComment', function (req, res) {
    const comment = {message: req.body.message};
    const article = req.body.articleId;
    db.Note.create(comment)
    .then(dbNote => { 
        console.log('The comment is away to the database, captain!')
        console.log(dbNote)
        db.Article.findOneAndUpdate(
            {_id: article},
            { $push: { notes: dbNote._id } },
        ).then(data => {
            console.log('Update has been sent to the article, Captain!')
            res.end();
        })
        .catch(err => {
            console.log("We've got a problem, captain! The update Article route failed!")
            console.log(err);
        });
    })
    .catch(err => {
        console.log("We've got a problem, captain! The create comment route failed!")
        console.log(err);
    });
})


//-------------------------------------

//Remove an article from the database

router.delete('/delArt', function (req, res) {
    console.log(req.body)
    db.Article.deleteOne(req.body)
    .then(data => {
        console.log(data);
        res.end();
    })
    .catch(err => {
        console.log("We've got a problem, captain! The delete route failed!")
        console.log(err);
    });
});

//-------------------------------------

//Remove a comment from the database

router.delete('/delComm', function (req, res) {
    const commentId = { _id: req.body._id };
    const articleId = { _id: req.body.article};
    db.Note.findOneAndRemove(commentId)
    .then(data => {
        db.Article.findOneAndUpdate(
            { _id: articleId },
            { $pull: { notes: req.body._id } }
        ).then(data => {
            console.log('The command to delete the comment id has been sent to the article, Captain!')
            res.end();
        })
        .catch(err => {
            console.log("We've got a problem, captain! The delete comment id from Article route failed!")
            console.log(err);
        });
    })
    .catch(err => {
        console.log("We've got a problem, captain! The delete comment route failed!")
        console.log(err);
    });
});

//-------------------------------------
// Export routes for server.js to use.
module.exports = router;