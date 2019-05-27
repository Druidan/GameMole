# GameMole
An aggregator of the latest news from the most popular game news sites on the internet.

## Overview and Goals
With this project, we will create an html scrapper that will aggregate news articles from at least three different high-profile game news sites. We want users to be able to peruse these articles to get an idea of what is in each of them,, visit them, and save them for later.

## Deployment
This project will be deployed on Heroku as [GameMole](https://gamemole.herokuapp.com).

## MVP
When this site is visited, it must be able to do the following:
* Welcome the user to the site.
* Present them with the following actions:
  * Scrape news sites.
    * When this action is taken, present the user with five news stories from each site. Each article must have the following:
      * Headline - the title of the article
      * Summary - a short summary of the article
      * URL - the url to the original article
    * The user will be given the additional action of saving each article to the database.
      * When this action is taken, it will store all of the data scraped from the web into the database.
      * The user will then be able to leave comments on the article immediately, which will also be saved to the database.
  * Display saved articles
    * When this action is taken, all of the articles that have been saved will be displayed. 
    * Saved articles will have the following additional buttons:
      * Delete article - this will delete the article from the database.
      * Comments - This button will display all comments left on that article in a new div below the article.
        * From here, the user can do the following: 
          * Delete comments on the article 
          * Add a new comment to the article. 

## Dependancies
I will be using the following NPM for this app:
* [Express](https://www.npmjs.com/package/express) - Express will handle our routing and server.
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - We will practice server-side view engines with express-handlebars.
* [Cheerio](https://www.npmjs.com/package/cheerio) - Cheerio will help us aggregate the data we need for site from our chosen game news outlets.
* [Mongoose](https://www.npmjs.com/package/mongoose) - We will be using Mongo for our database system, and Mongoose will allow us to manipulate it.
* [Axios](https://www.npmjs.com/package/axios) - Axios will let us make our calls to the database.
* [DotEnv](https://www.npmjs.com/package/dotenv) - DotEnv will keep my secrets safe.

## Active Bugs and Issues
_None Yet_

## Future Features
If the MVP is met, I will begin adding the followng: 
* The user can determine how many articles they wish to see at a time from each site (5, 10, 15).
* Articles will have the following additional data:
  * Source Website
  * Photo
  * Date Posted
* The number of articles displayed from the database will be capped at 10, and the user can go to the next ten articles, and back and forth.
* User Login and Authentication
  * When an article is saved it will include the username of the original user who saved it.
  * When a comment is saved it will include the username of the original user who saved it. 
  * If a user tries to delete an article or comment that they did not post it will not let them.
* Give users the ability to search articles in the database by the following:
  * Source
  * Keyword
  * User who saved it.