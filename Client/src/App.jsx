import React, { useEffect } from 'react';
import Routes from './components/Routes/Routes';
import { useDispatch, connect } from 'react-redux';
import { authenticationCheck } from './actions/userActions';
import { setCategories } from './actions/categoriesActions';
import { getCartProducts } from './actions/cartActions';

import Axios from './utils/Axios';

import LoadingGIF from './assets/images/Loading.gif';

import './App.css';

const App = ({ isLogged, loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticationCheck());

    Axios({
      method: 'GET',
      url: '/categories'
    })
    .then(res => dispatch(setCategories(res.data.categories)))
    .catch(err => console.error(err));

    if(isLogged) dispatch(getCartProducts(isLogged)); 
  }, [dispatch, isLogged]);

  return (
    <div className="App">
      { loading && <div className="loading">
        <img src={ LoadingGIF } alt="" />
      </div> }
      <Routes />
    </div>
  );
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  loading: state.cart.loading
});

export default connect(mapStateToProps)(App);