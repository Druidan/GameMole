import React, { Component, Fragment } from 'react';
import '../styles/buttons.css';
import {addClass, hasClass, say} from '../utilities/elcFunctions';
import Axios from 'axios';

export default class SaveButton extends Component {
    constructor() {
        super();
        this.state =null
    }

    render() {
        return (
        <Fragment>
            <button className='artBtn saveBtn' onClick={this.saveArt}>
                Save this Article?
            </button>
        </Fragment>
        )
    };

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
            savedDiv.append(btnParent);
            button.textContent = 'Saved!'
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

};



