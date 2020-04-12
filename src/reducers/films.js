import { GET_FILMS, UPDATE_ACTIVE_CATEGORY, UPDATE_ACTIVE_FILM, SELECT_FILM } from '../actions';

const initialState = {
    list: [],
    activeCategory: { key: 'comedy' },
    activeFilm: { index: null },
    selectedFilm: null
};

function films(state = initialState, { type, payload }) {
    switch (type) {
        case GET_FILMS:
            return {
                ...state,
                list: payload
            }

        case UPDATE_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: {
                    key: payload
                }
            }
        
        case UPDATE_ACTIVE_FILM:
            return {
                ...state,
                activeFilm: {
                    index: payload
                }
            }

        case SELECT_FILM:
            return {
                ...state,
                selectedFilm: state.list.find(film => film.id === payload)
            }

        default:
            return state;
    }
}

export default films;