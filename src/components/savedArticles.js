import React, { Component, Fragment } from 'react';
import '../styles/articles.css';
import Axios from 'axios';
import DeleteButton from './DeleteButton';
import CommentingDiv from './commentingDiv';
import { q, say } from '../utilities/elcFunctions';


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

    deleteComment = (event) => {
        event.preventDefault();
        const button = (event.target) ? event.target : event.srcElement;
        const btnParent = button.closest('div');
        const articleId = button.closest('.savedArt').id;
        const commentId = btnParent.id;
        Axios.delete('/delComm', { data: {_id: commentId, article: articleId} })
        .then(res => {
            say('Delete Comment command sent, Captain!');
            console.log(res);
            btnParent.remove();
        })
        .catch(function (err) {
            console.log("We've got a problem, captain! We failed to delete the comment!")
            console.log(err);
        });
    }

    render() {
        return (
        <Fragment>
            <article>
            {Object.keys(this.state.allArticles).map(article => { 
                const thisArticle = this.state.allArticles[article];
                return <div key={thisArticle._id} className={`articleDiv ${thisArticle.source} savedArt`} id={thisArticle._id}>
                <a href={thisArticle.sourceRef} target='_blank' rel='noopener noreferrer'>
                    <img className='newsLogo' src={`./assets/images/${thisArticle.logo}`} alt={`The logo for ${thisArticle.source}`}></img>
                </a>
                <h2 className='articleTitle'>{thisArticle.title}</h2>
                <p className='articleSum'>{thisArticle.summary}</p>
                <a className='goToArticleBtn' href={thisArticle.link} target='_blank' rel='noopener noreferrer'>
                    <button>
                        Read Article
                    </button>
                </a>
                <DeleteButton />
                {thisArticle.notes.map(note => {
                    return <div key={note._id} className='eachComment' id={note._id}>
                        <p>{note.message}</p>
                        <button className='commBtn' onClick={this.deleteComment}><i className="fas fa-trash-alt"></i></button>
                    </div>
                })}
                <CommentingDiv />
                </div>
            })}
            </article>
        </Fragment>
        )
    };
};


