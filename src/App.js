import React from 'react';
import { useSelector } from 'react-redux'
import './App.css';

import Navigation from './components/Navigation'
import ListOfFilms from './components/ListOfFilms';
import FilmPreview from './components/FilmPreview';

function App() {
  const { selectedFilm } = useSelector(({ films }) => films);

  return (
    <div className={`App ${selectedFilm ? 'film-preview-mode' : null}`}>
      <Navigation />
      <ListOfFilms />
      <FilmPreview />
    </div>
  );
}

export default App;
