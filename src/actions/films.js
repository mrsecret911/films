import axios from 'axios';

export const GET_FILMS = 'GET_FILMS';
export const UPDATE_ACTIVE_CATEGORY = 'UPDATE_ACTIVE_CATEGORY';
export const UPDATE_ACTIVE_FILM = 'UPDATE_ACTIVE_FILM'
export const SELECT_FILM = 'SELECT_FILM';

export const getFilms = () => dispatch => {
    axios.get('https://raw.githubusercontent.com/roman-curse/videoJson/master/videoJson.json')
        .then(({ data: { results } }) => {
            dispatch({
                type: GET_FILMS,
                payload: results
            });
        })
        
}

export const updateActiveCategory = key => {
    return {
        type: UPDATE_ACTIVE_CATEGORY,
        payload: key
    };
}

export const updateActiveFilm = index => {
    return {
        type: UPDATE_ACTIVE_FILM,
        payload: index
    };
}

export const selectFilm = id => {
    return {
        type: SELECT_FILM,
        payload: id
    };
}
