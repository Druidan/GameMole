import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className='homeCorner'>
        <a href='https://edwardcheever.herokuapp.com' target='_blank' rel='noopener noreferrer'><i className='fas headMenu fa-home'></i></a>
      </div>
      <header className='titleDiv'>
        <h1 className='titleGmole'>GameMole</h1>
        <p className='gMoleTag'>Digging up the latest videogame news</p>
      </header>
    </nav>
  );
}

export default Navbar;
