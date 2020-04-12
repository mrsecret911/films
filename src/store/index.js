import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import reducer from '../reducers';

const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducer, compose(applyMiddleware(thunk), REDUX_DEVTOOLS));

export default store;