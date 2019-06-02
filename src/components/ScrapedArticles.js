import React, { Component, Fragment } from 'react';
import '../styles/ScrapedArticles.css';
import Axios from 'axios';
import SaveButton from './SaveButton';

export default class ScrapedArticles extends Component {
  constructor() {
    super();
    this.state = {
      allArticles: {}
    }
  }

  componentDidMount () {
    Axios.get('/scrape')
      .then(res => {this.setState({ allArticles: res.data});
      // console.log(this.state.allArticles);
      })
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
            return <div key={article} className={`articleDiv ${this.state.allArticles[article].source}`}>
              <a href={this.state.allArticles[article].sourceRef} target='_blank' rel='noopener noreferrer'>
                <img className='newsLogo' src={`./assets/images/${this.state.allArticles[article].logo}`} alt={`The logo for ${this.state.allArticles[article].source}`}></img>
              </a>
              <h2 className='articleTitle'>{this.state.allArticles[article].title}</h2>
              <p className='articleSum'>{this.state.allArticles[article].summary}</p>
              <SaveButton />
            </div>
          })}
        </article>
      </Fragment>
    )
  }
};


