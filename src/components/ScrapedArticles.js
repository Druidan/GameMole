import React, { Component, Fragment } from 'react';
import '../styles/articles.css';
import Axios from 'axios';
import SaveButton from './SaveButton';
import {hasClass, addClass, say} from '../utilities/elcFunctions'

export default class ScrapedArticles extends Component {
  constructor() {
    super();
    this.state = {
      allArticles: {}
    }
  }

  saveArt(event) {
    event.preventDefault();
    const button = (event.target) ? event.target : event.srcElement;
    const btnParent = button.parentNode;
    const title = btnParent.firstChild.nextSibling.textContent;
    const link = btnParent.lastChild.href;
    const summary = btnParent.childNodes[2].textContent
    let source;
    let sourceRef;
    let logo;
    switch(btnParent.classList.value) {
        case 'articleDiv scrapedArt IGN':
            source = 'IGN';
            sourceRef = 'https://www.ign.com';
            logo = 'IGNlogo.png';
            break;
        case 'articleDiv scrapedArt Game Informer':
            source = 'Game Informer';
            sourceRef = 'https://www.gameinformer.com/';
            logo = 'GIlogo.png';
            break;
        case 'articleDiv scrapedArt Destructoid':
            source = 'Destructoid';
            sourceRef = 'https://www.destructoid.com/';
            logo = 'Destlogo.png';
            break;
        default :
            source = '';
            sourceRef = '';
            logo = '';
            break;
    }
    const newArticle = {
        title: title,
        link: link,
        summary: summary,
        source: source,
        sourceRef: sourceRef,
        logo: logo,
    }
    if (!hasClass(btnParent, 'savedArt')) {
        const savedDiv = document.getElementById('savedDivId');
        // savedDiv.append(btnParent);
        addClass(btnParent, 'savedArt');
        saveIt();
    } else {
        say('Ow! Stop clicking me!')
    }
    function saveIt () {
        Axios.post('/saveArt', newArticle)
            .then(res => {
                say('Post sent, Captain!');
            })
            .catch(function (err) {
                console.log("We've got a problem, captain! The Post failed!")
                console.log(err);
            });
    }
};

  componentDidMount () {
    Axios.get('/scrape')
      .then(res => {this.setState({ allArticles: res.data})})
      .catch(function (err) {
        console.log("We've got a problem, captain! The Scrape failed!")
        console.log(err); 
      });
  };

  render() {
    return (
      <Fragment>
        <article>
          {Object.keys(this.state.allArticles).map(article => {
            return <div key={article}  className={`articleDiv scrapedArt ${this.state.allArticles[article].source}`}>
              <a href={this.state.allArticles[article].sourceRef} target='_blank' rel='noopener noreferrer'>
                <img className='newsLogo' src={`./assets/images/${this.state.allArticles[article].logo}`} alt={`The logo for ${this.state.allArticles[article].source}`}></img>
              </a>
              <h2 className='articleTitle'>{this.state.allArticles[article].title}</h2>
              <p className='articleSum'>{this.state.allArticles[article].summary}</p>
              <SaveButton />
              <a href={this.state.allArticles[article].link} target='_blank' rel='noopener noreferrer'>
                <button>
                    Read Article
                </button>
              </a>
            </div>
            
          })}
        </article>
      </Fragment>
    )
  };

};


