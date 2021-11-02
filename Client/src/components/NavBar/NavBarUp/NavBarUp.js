import React, { Fragment, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { searchProducts } from '../../../actions/searchActions';

import Logo from '../../../assets/images/logo.svg';

import './NavBarUp.css';

const NavBarUp = () => {
    const [menu, setMenu] = useState(false);

    const searchInputRef = useRef(null);

    const authUser = useSelector(state => state.user);
    const cartCount = useSelector(state => state.cart.products);
    const searchText = useSelector(state => state.search);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSearch = e => {
        dispatch(searchProducts(e.target.value));

        if(searchText.length > 0) history.push('/search');
    }

    const Logout = () => {
        dispatch(logout());

        history.push('/signin');
    }

    return(
        <div className="NavBarUp">
            <div className="navbarup__right">
                <div className="search">
                    <FontAwesomeIcon icon={ faSearch } size="lg" color="var(--default-grey-color)" />
                    <input type="text" placeholder="חפש מוצר" ref={ searchInputRef } onChange={ handleSearch } />
                </div>            
            </div>
            <Link to="/">
                <img src={ Logo } width="157" height="82" alt=""/>
            </Link>
            <div className="navbarup__left">
                { authUser && !authUser.isLogged ? <Link to="/signin">
                    <FontAwesomeIcon icon={ faSignInAlt } color="var(--default-grey-color)" size="lg" style={ { transform: 'rotate(-180deg)' } } />
                </Link> : <Fragment>
                    <Link to="/cart">
                        { cartCount.length !== 0 && <div className="cart-circle">
                            <h5>{ cartCount.length > 99 ? '+99' : cartCount.length }</h5>
                        </div> }
                        <FontAwesomeIcon icon={ faShoppingCart } size="lg" color="var(--default-grey-color)" />
                    </Link>
                    <div className="user" onMouseEnter={ () => setMenu(true) } onMouseLeave={ () => setMenu(false) }>
                        <Link to="/account">
                            <FontAwesomeIcon icon={ faUser } color="var(--default-grey-color)" size="lg" alt=""/>
                        </Link>
                        { menu && <div className="menu">
                            <h3 style={ { fontWeight: 500 } }>{ authUser.user.fullName }</h3>
                            <p>{ authUser.user.email }</p>
                            <div className="buttons">
                                <Link to="/account">החשבון שלי</Link>
                                { authUser.user.isAdmin && <Link to="/panel">פאנל ניהול</Link> }
                                <button onClick={ Logout }>התנתק</button>
                            </div>
                        </div> }
                    </div>
                </Fragment> }
            </div>
        </div>
    )
}

export default NavBarUp;