import React, { Component, Fragment } from 'react';
import '../styles/articles.css';
import Axios from 'axios';
import DeleteButton from './DeleteButton';
import CommentingDiv from './commentingDiv';
import { q } from '../utilities/elcFunctions';


export default class SavedArticles extends Component {
    constructor() {
        super();
        this.state = {
            allArticles: {},
            allComments: {},
        };
    }

    componentDidMount () {
        Axios.all([
            Axios.get('/findSaved'),
            Axios.get('/findComments')
        ])
        .then(Axios.spread( (savedData, commentData) => {
            this.setState({ 
                allArticles: savedData.data,
                allComments: commentData.data
            });
        }))
        .catch(function (err) {
            console.log("We've got a problem, captain! We couldn't find the saved articles!")
            console.log(err); 
        });
    };

    render() {
        return (
        <Fragment>
            <article>
            {Object.keys(this.state.allArticles).map(article => { 
                const thisArticle = this.state.allArticles[article];
                q(thisArticle)
                return <div key={this.state.allArticles[article]._id} className={`articleDiv ${this.state.allArticles[article].source} savedArt`} id={this.state.allArticles[article]._id}>
                <a href={this.state.allArticles[article].sourceRef} target='_blank' rel='noopener noreferrer'>
                    <img className='newsLogo' src={`./assets/images/${this.state.allArticles[article].logo}`} alt={`The logo for ${this.state.allArticles[article].source}`}></img>
                </a>
                <h2 className='articleTitle'>{this.state.allArticles[article].title}</h2>
                <p className='articleSum'>{this.state.allArticles[article].summary}</p>
                <a className='goToArticleBtn' href={this.state.allArticles[article].link} target='_blank' rel='noopener noreferrer'>
                    <button>
                        Read Article
                    </button>
                </a>
                <DeleteButton />
                {/* {this.state.allArticles[article].notes.map(note => {
                    return
                })} */}
                <CommentingDiv />
                </div>
            })}
            </article>
        </Fragment>
        )
    };
};


