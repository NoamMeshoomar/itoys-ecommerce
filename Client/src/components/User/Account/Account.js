import React from 'react';
import { Redirect } from 'react-router-dom';

import OrdersTable from './OrdersTable/OrdersTable';

import './Account.css';

const Account = () => { 
    const token = localStorage.getItem('token');

    if(!token) return <Redirect to="/signin" />

    return(
        <div className="Account">
            <OrdersTable />
        </div>
    )
}

export default Account;