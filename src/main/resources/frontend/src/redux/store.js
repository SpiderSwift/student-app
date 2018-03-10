import toDoListReducer from './reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import thunk from 'redux-thunk';

const searchCategoryName = store => next => action => {
    console.log(action);
    next(action);
}

export const store = createStore(
    toDoListReducer,
    composeWithDevTools(applyMiddleware(thunk, searchCategoryName))
);

window.store = store;