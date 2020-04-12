import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { updateActiveCategory, updateActiveFilm } from '../actions';
import { ARROW_UP, ARROW_DOWN, ARROW_RIGHT } from '../constants';

const categories = [
    {value: 'Action', key: 'action'},
    {value: 'Comedy', key: 'comedy'},
    {value: 'Drama', key: 'drama'},
    {value: 'Documentary', key: 'documentary'},
    {value: 'Family', key: 'family'},
    {value: 'Thriller', key: 'thriller'}
]

function Navigation() {
    const dispatch = useDispatch();
    const categoryRef = useRef(null);
    const activeCategory = useSelector(({ films: { activeCategory } }) => activeCategory);

    useEffect(() => {        
        if(categoryRef.current) {
            categoryRef.current.focus()
        }
    }, [activeCategory]);

    const keyDown = event => {
        event.preventDefault();
        const { key, target } = event;
        const index = +target.getAttribute('data-index');
        const prev = index - 1;
        const next = index + 1;

        switch(key) {
            case ARROW_UP:
                if(categories[prev]) {
                    dispatch(updateActiveCategory(categories[prev].key))
                }
                break;
            case ARROW_DOWN:
                if(categories[next]) {
                    dispatch(updateActiveCategory(categories[next].key))
                }
                break;
            case ARROW_RIGHT:
                dispatch(updateActiveFilm(0))
                break;
        }
    };

    return (
        <nav onKeyDown={keyDown} className='navigation'>
            {categories.map((category, i) => 
                <button
                    key={category.key}
                    data-index={i}
                    ref={category.key === activeCategory.key ? categoryRef : null}
                    className='navigation__item'>
                    {category.value}
                </button>
            )} 
        </nav>
    );
}

export default Navigation;