import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { updateQuantity, removeFromCart } from '../../../../actions/cartActions';
import { serverMediaUrl } from '../../../../utils/serverMediaUrl';
import Axios from '../../../../utils/Axios';

const CartItem = ({ item }) => {
	const prevQuantity = useRef(item.quantity);

	const dispatch = useDispatch();

    const handleChangeQuantity = (product, quantity) => {
        Axios({
            method: 'PUT',
            url: '/cart',
            headers: {
                'token': localStorage.getItem('token')
            },
            data: {
                product,
                quantity
            }
        })
        .then(() => {
            dispatch(updateQuantity(product, 1, (quantity > prevQuantity.current) ? true : false));
        })
        .catch(err => console.error(err.response));
    }

	const handleRemoveFromCart = id => {
        if(id) {
            Axios({
                method: 'DELETE',
                url: '/cart',
                headers: {
                    'token': localStorage.getItem('token')
                },
                data: {
                    product: id
                }
            })
            .then(res => dispatch(removeFromCart(res.data.removedItem)))
            .catch(err => console.error(err));
        }
    }

	return(
		<tr key={ item._id }>
			<td><img src={ `${ serverMediaUrl }/products/${ item.productId.image }` } width="80" alt="" /></td>
			<td>{ item.productId.title }</td>
			<td>{ item.productId.price.toFixed(2) } ₪</td>
			<td><input 
				type="number" 
				min="1" 
				max="999" 
				onChange={ e => {
					prevQuantity.current = item.quantity;
					handleChangeQuantity(item, +e.target.value);
				} } 
				defaultValue={ item.quantity }
			/></td>
			<td>{ Number.isInteger(item.productId.price) ? item.productId.price * item.quantity : (item.productId.price * item.quantity).toFixed(2) } ₪</td>
			<td><button onClick={ () => handleRemoveFromCart(item._id) }>x</button></td>
		</tr>
	)
}

export default CartItem;