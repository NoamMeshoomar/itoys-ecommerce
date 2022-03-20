import React from 'react';
import { useSelector } from 'react-redux';
import Axios from '../../../utils/Axios';

import paypalBtn from '../../../assets/images/paypalbtn.png';

import './CartResult.css';

const CartResult = () => {
    const totalPrice = useSelector(state => state.cart.totalPrice);

    const handlePayment = () => {
        Axios({
            method: 'POST',
            url: '/cart/create_payment',
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(res => {
            const {paymentLink} = res.data;
            window.location.assign(paymentLink);
        })
        .catch(err => console.error(err.response));
    }

    return(
        <div className="CartResult">
            <h3 style={{color: '#fff', fontWeight: 400}}>סה"כ {totalPrice.toFixed(2)} ₪</h3>
            <img src={paypalBtn} alt="paypal payment button" onClick={handlePayment} />
        </div>
    )
}

export default CartResult;