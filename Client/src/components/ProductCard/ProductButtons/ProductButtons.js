import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addProductToCart, updateQuantity } from '../../../actions/cartActions';
import Axios from '../../../utils/Axios';

import './ProductButtons.css';

const ProductButtons = ({ _id, quantity }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const isLogged = useSelector(state => state.user.isLogged);

    const handleAddToCart = async () => {
        if(!isLogged) return history.push('/signin');
        if(loading) return;

        setLoading(true);

        return await Axios({
            method: 'POST',
            url: '/cart',
            headers: {
                'token': localStorage.getItem('token')
            },
            data: {
                product: _id,
                quantity: quantity ? +quantity : 1
            }
        }).then(res => {
            if(res.data.product) {
                setLoading(false);
                dispatch(addProductToCart(res.data.product));
            } else if(res.data.updatedCartProduct) {
                setLoading(false);
                dispatch(updateQuantity(res.data.updatedCartProduct, quantity ? +quantity : 1, true));
            }
        }).catch(err => console.error(err.response));
    }

    const handleBuyNow = async () => {
        await handleAddToCart();

        history.push('/cart');
    }

    return(
        <div className="ProductButtons">
            <button onClick={ handleBuyNow }>קנה עכשיו</button>
            <button onClick={ handleAddToCart }>הוסף לסל</button>
        </div>
    )
}

export default ProductButtons;