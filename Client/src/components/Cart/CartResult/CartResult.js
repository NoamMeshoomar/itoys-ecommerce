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
            const paymentUrl = res.data.paymentUrl;

            for(let i = 0; i < paymentUrl.length; i++) {
                if(paymentUrl[i].rel === 'approval_url'){
                    window.location.assign(paymentUrl[i].href);
                    break;
                }
            }
        })
        .catch(err => console.error(err.response));
    }

    return(
        <div className="CartResult">
            <h3 style={ { color: '#fff', fontWeight: 400 } }>סה"כ { totalPrice.toFixed(2) } ₪</h3>
            <img src={ paypalBtn } alt="" onClick={ handlePayment } />
        </div>
    )
}

export default CartResult;