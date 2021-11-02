import { combineReducers } from 'redux';

import userReducer from './userReducer';
import cartReducer from './cartReducer';
import categoriesReducer from './categoriesReducer';
import searchReducer from './searchReducers';

const allReducers = combineReducers({ 
    user: userReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    search: searchReducer
});

export default allReducers;