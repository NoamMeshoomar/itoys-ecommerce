import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartTable from './CartTable/CartTable';
import CartResult from './CartResult/CartResult';

import './Cart.css';

const Cart = () => {
    const token = localStorage.getItem('token');
    const totalPrice = useSelector(state => state.cart.totalPrice);

    if(!token) return <Redirect to="/signin" />

    return(
        <div className="Cart">
            <CartTable />
            { totalPrice !== 0 && <CartResult /> }
        </div>
    )
}

export default Cart;