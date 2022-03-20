import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAllFromCart } from '../../../actions/cartActions';
import axios from '../../../utils/Axios';

import loadingGif from '../../../assets/images/Loading.gif';
import checkImage from '../../../assets/images/check.svg';

import './SuccessfulPayment.css';

const SuccessfulPayment = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        const paymentID = new URLSearchParams(location.search).get("paymentId");
        const payerID = new URLSearchParams(location.search).get("PayerID");

        axios({
            method: 'POST',
            url: `/cart/execute_payment/${paymentID}/${payerID}`,
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(() => {
            setLoading(false);
            dispatch(removeAllFromCart());
        })
        .catch(err => console.error(err));
    }, [dispatch, location.search]);

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