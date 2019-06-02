import React, { Component, Fragment } from 'react';
import '../styles/articles.css';
import Axios from 'axios';
import DeleteButton from './DeleteButton';


export default class SavedArticles extends Component {
    constructor() {
        super();
        this.state = {
            allArticles: {}
        };
    }

    componentDidMount () {
        Axios.get('/findSaved')
        .then(res => {this.setState({ allArticles: res.data});
        })
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
                return <div key={article} className={`articleDiv ${this.state.allArticles[article].source} savedArt`}>
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
                </div>

            })}
            </article>

        </Fragment>
        )
    };
};


