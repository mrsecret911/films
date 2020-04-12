import React, { useEffect, useState, useRef, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { ARROW_UP, ARROW_DOWN, ARROW_RIGHT, ARROW_LEFT, ARROW_ENTER, NO_IMAGE_URL } from '../constants';
import { getFilms, updateActiveFilm, updateActiveCategory, selectFilm } from '../actions';


const ITEMS_IN_ROW = 5;

function ListOfFilms() {
    const dispatch = useDispatch();
    const filmRef = useRef(null);
    const {
        list, 
        activeCategory, 
        activeFilm, 
        activeFilm: { index: activeFilmIndex}
    } = useSelector(({ films }) => films);

    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch]);

    useEffect(() => {
        if(filmRef.current) {
            filmRef.current.focus()
        }
    }, [activeFilm]);

    const onImgError = event => {
        event.target.src = NO_IMAGE_URL;
    }

    const increaseIndex = num => activeFilmIndex + num;
    const decreaseIndex = num => activeFilmIndex - num;

    const keyDown = ({ key, target }) => {
        switch(key) {
            case ARROW_UP:
                if(activeFilmIndex - ITEMS_IN_ROW >= 0) {
                    dispatch(updateActiveFilm(decreaseIndex(ITEMS_IN_ROW)))
                }
                break;
            case ARROW_DOWN:
                if(activeFilmIndex + ITEMS_IN_ROW < films.length) {
                    dispatch(updateActiveFilm(increaseIndex(ITEMS_IN_ROW)))
                }
                break;
            case ARROW_RIGHT:
                if(activeFilmIndex < films.length - 1) {
                    dispatch(updateActiveFilm(increaseIndex(1)))
                }
                break;
            case ARROW_LEFT:
                if(activeFilmIndex == 0) {
                    dispatch(updateActiveFilm(null));
                    dispatch(updateActiveCategory(activeCategory.key));
                } else {
                    dispatch(updateActiveFilm(decreaseIndex(1)))
                }
                break;
            case ARROW_ENTER:
                dispatch(selectFilm(+target.getAttribute('data-id')));
                break;
        }
    }

    const films = list
        .filter(film => film.genre_ids.includes(activeCategory.key))
        .map((film, i) => 
            <div key={film.id} 
                 className='list-of-films__item' 
                 tabIndex='0'
                 data-id={film.id}
                 ref={i === activeFilmIndex ? filmRef : null}>
                <img src={film.poster_path} onError={onImgError} className='film-poster' />
            </div>
        )
    
    return (
        <div className='list-of-films' onKeyDown={keyDown}>
            {films.length ? films : <div>No results</div>}
        </div>
    );
}

export default ListOfFilms;