import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { ARROW_RIGHT, ARROW_LEFT, ARROW_BACK, NO_IMAGE_URL } from '../constants';
import { selectFilm, updateActiveFilm } from '../actions';

function ListOfFilms() {
    const dispatch = useDispatch();
    const { selectedFilm: film, activeFilm} = useSelector(({ films }) => films);

    const getYear = date => {
        return new Date(date).getFullYear();
    }

    const onImgError = event => {
        event.target.src = NO_IMAGE_URL;
    }

    const keyDown = ({ key, target }) => {
        switch(key) {
            case ARROW_BACK:
                dispatch(selectFilm(null))
                dispatch(updateActiveFilm(activeFilm.index))
                break;
            case ARROW_RIGHT:
                console.log(film)
                if(target.nextElementSibling) {
                    target.nextElementSibling.focus();
                }
                break;
            case ARROW_LEFT:
                if(target.previousElementSibling) {
                    target.previousElementSibling.focus();
                }
                break
        }
    }
    
    return (
        <> 
            {film &&
                <div className='film-preview' onKeyDown={keyDown}>
                    <h1>{film.title} ({getYear(film.release_date)})</h1>
                    <div className='film-preview__info'>
                        <div className="film-preview__video-wrap">
                            <img src={film.poster_path} alt={film.title} onError={onImgError}/>
                            <div>
                                <button autoFocus>Sena</button>
                                <button>Trailer</button>
                                <button>Huskeliste</button>
                            </div>
                        </div>
                        <p className='film-preview__overview'>{film.overview}</p>
                    </div>
                </div>
            }
        </>
    );
}

export default ListOfFilms;