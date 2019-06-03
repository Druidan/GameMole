import React, { Component, Fragment } from 'react';
import '../styles/buttons.css';
import {say} from '../utilities/elcFunctions';
import Axios from 'axios';

export default class CommentingDiv extends Component {
    constructor(props) {
        super();
        this.state = null
    }

    componentDidMount() {
        if(this.thisBtn) {
            const article = this.thisBtn.parentNode.parentNode;
            this.setState({
                article: article,
                articleId: article.id
            })
        }
    }

    addComment = (event) => {
        event.preventDefault();
        const article = this.state.article;
        const commentData = {
            message: article.querySelector('textarea').value.trim(),
            articleId: article.id,
        };
        Axios.post('/makeComment', commentData)
        .then(res => {
            say('Comment sent, Captain!');
            window.location.reload();
        });
    }

    render() {
        return (
        <Fragment>
            <div className='commentDiv'>
                <textarea className='commentField' name='comment' placeholder='Write your comment here!'></textarea>
                <button className='artBtn addCommBtn' ref = {c => this.thisBtn = c} onClick={this.addComment}>
                    Add Comment
                </button>
            </div>
        </Fragment>
        )
    };


}