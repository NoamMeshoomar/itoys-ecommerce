import React from 'react';
import { useSelector } from 'react-redux';

import CartItem from './CartItem/CartItem';

import './CartTable.css';

const CartTable = () => {
    const cart = useSelector(state => state.cart);

    return(
        <div className="CartTable">
            {cart.products.length === 0 ? <div>
                <h3 className="empty__cart">עגלת הקניות ריקה כרגע.</h3>
            </div> : <table>
                <thead>
                    <tr>
                        <th>תמונה</th>
                        <th>כותרת המוצר</th>
                        <th>מחיר</th>
                        <th>כמות</th>
                        <th>מחיר כולל כמות</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.products.reverse().map(item => {
                        return <CartItem key={item._id} item={item} />
                    })}
                </tbody>
            </table>}
        </div>
    )
}

export default CartTable;