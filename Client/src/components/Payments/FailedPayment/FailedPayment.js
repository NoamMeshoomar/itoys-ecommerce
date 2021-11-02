import React from 'react';
import { Link } from 'react-router-dom';

import failedImage from '../../../assets/images/close.svg';

import './FailedPayment.css';

const FailedPayment = () => {
    return(
        <div className="FailedPayment">
            <img src={ failedImage } width="60" alt=""/>
            <h1>ההזמנה בוטלה.</h1>
            <h3>חזור לדף הבית <Link to="/">דף הבית</Link></h3>
        </div>
    )
}

export default FailedPayment;