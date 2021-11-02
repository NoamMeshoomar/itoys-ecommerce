import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from '../../../utils/Axios';
import { removeAllFromCart } from '../../../actions/cartActions';

import loadingGif from '../../../assets/images/Loading.gif';
import checkImage from '../../../assets/images/check.svg';

import './SuccessfulPayment.css';

const SuccessfulPayment = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const paymentID = new URLSearchParams(window.location.search).get('paymentId');
        const payerID = new URLSearchParams(window.location.search).get('PayerID');

        Axios({
            method: 'POST',
            url: `/cart/execute_payment?paymentID=${ paymentID }&payerID=${ payerID }`,
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(() => {
            setLoading(false);
            dispatch(removeAllFromCart());
        })
        .catch(err => console.error(err));
    }, [dispatch]);

    return(
        <div className="SuccessfulPayment">
            { loading ? <img src={ loadingGif } width="50" alt=""></img> : <div className="payment__successful">
                <img src={ checkImage } width="60" alt=""/>
                <h1>ההזמנה הושלמה!</h1>
                <h3>הצג הזמנה ב- <Link to="/account">החשבון שלי</Link></h3>
            </div> }
        </div>
    )
}

export default SuccessfulPayment;