import React, { Component, Fragment } from 'react';
import '../styles/buttons.css';
import {addClass, hasClass, say, removeClass} from '../utilities/elcFunctions';
import Axios from 'axios';

export default class DeleteButton extends Component {
    constructor() {
        super();
        this.state = null
    }

    render() {
        return (
        <Fragment>
            <button className='artBtn deleteBtn' onClick={this.delArt}>
                Delete this Article?
            </button>
        </Fragment>
        )
    };

    delArt(event) {
        event.preventDefault();
        const button = (event.target) ? event.target : event.srcElement;
        const btnParent = button.parentNode;
        const link = btnParent.lastChild.href;
        if(hasClass(btnParent, 'savedArt')){
            Axios.delete('/delArt', { data: {link: link} })
            .then(res => {
                say('Delete sent, Captain!');
                console.log(res);
            })
            .catch(function (err) {
                console.log("We've got a problem, captain! The delete failed!")
                console.log(err);
            });
            removeClass(btnParent, 'savedArt');
            button.textContent = 'Deleted!'
            const scrapedDiv = document.getElementById('scrapedDivId');
            scrapedDiv.prepend(btnParent);
        } else {
            say('Ow! Stop clicking me!')
        };
    };

};

