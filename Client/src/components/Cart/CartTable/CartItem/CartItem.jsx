import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../../utils/Axios';

import { updateQuantity, removeFromCart } from '../../../../actions/cartActions';
import { serverMediaUrl } from '../../../../utils/serverMediaUrl';
import { useInStock } from '../../../../hooks/useInStock';

const CartItem = ({ item }) => {
	const prevQuantity = useRef(item.quantity);

	const dispatch = useDispatch();

    const inStock = useInStock(item.productId._id, item.productId.quantity);

    const handleChangeQuantity = (product, quantity) => {
        dispatch(updateQuantity(product, 1, (quantity > prevQuantity.current) ? true : false));
        axios({
            method: 'PUT',
            url: '/cart',
            headers: {
                'token': localStorage.getItem('token')
            },
            data: {
                product: product._id,
                quantity
            }
        })
        .catch(err => console.error(err));
    }

	const handleRemoveFromCart = id => {
        if(id) {
            axios({
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
		<tr key={item._id}>
			<td>
                <img src={`${serverMediaUrl}/products/${item.productId.id + item.productId.imageType}`} width="80" alt="" />
            </td>
			<td>{item.productId.title}</td>
			<td>{item.productId.price.toFixed(2)} ₪</td>
			<td>
                {!inStock ? item.quantity : <input 
                    type="number" 
                    min="1" 
                    max="999" 
                    onChange={e => {
                        if(!inStock) return;
                        prevQuantity.current = item.quantity;
                        handleChangeQuantity(item, +e.target.value);
                    }} 
                    defaultValue={item.quantity}
			    />}
            </td>
			<td>{Number.isInteger(item.productId.price) ? item.productId.price * item.quantity : (item.productId.price * item.quantity).toFixed(2)} ₪</td>
			<td><button onClick={() => handleRemoveFromCart(item._id)}>x</button></td>
		</tr>
	)
}

export default CartItem;