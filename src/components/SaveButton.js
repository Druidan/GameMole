import React, { Component, Fragment } from 'react';
import '../styles/SaveButton.css';
import {addClass, hasClass, say} from '../utilities/elcFunctions';
import Axios from 'axios';

export default class SaveButton extends Component {
    constructor() {
        super();
        this.state = null;
    }

    render() {
        return (
        <Fragment>
            <button className='saveBtn' onClick={saveArt}>
                Save this Article?
            </button>
        </Fragment>
        )

    }
};


function saveArt(event) {
    event.preventDefault();
    const button = (event.target) ? event.target : event.srcElement;
    const btnParent = button.parentNode;
    const title = btnParent.firstChild.nextSibling.textContent;
    const link = btnParent.firstChild.href;
    const summary = btnParent.childNodes[2].textContent
    let source;
    let sourceRef;
    let logo;
    switch(btnParent.classList.value) {
        case 'articleDiv IGN':
            source = 'IGN';
            sourceRef = 'https://www.ign.com';
            logo = 'IGNlogo.png';
            break;
        case 'articleDiv Game Informer':
            source = 'Game Informer';
            sourceRef = 'https://www.gameinformer.com/';
            logo = 'GIlogo.png';
            break;
        case 'articleDiv Destructoid':
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
    if (!hasClass(button, 'savedArt')) {
        button.textContent = 'Saved!';
        addClass(button, 'savedArt');
        saveIt();
    } else {
        say('Ow! Stop clicking me!')
    }
    function saveIt () {
        Axios.post('/saveArt', newArticle)
            .then(res => {
                say('Post sent, Captain!');
                console.log(res);
            })
            .catch(function (err) {
                console.log("We've got a problem, captain! The Post failed!")
                console.log(err);
            });

    }
}