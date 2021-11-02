import Axios from "../utils/Axios";

const updatedTotalPrice = async () => {
    return await Axios.get('/cart/total', {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .then(async res => await res.data.totalPrice);
}

export const getCartProducts = () => dispatch => {
    Axios({
        method: 'GET',
        url: '/cart',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .then(async res => {
        const { cartProducts } = res.data;

        const totalPrice = await updatedTotalPrice();

        dispatch({ type: 'GET_CART_PRODUCTS', payload: { totalPrice, products: cartProducts } });
    })
    .catch(err => console.error(err.response));
}

export const addProductToCart = payload => async dispatch => {
    const totalPrice = await updatedTotalPrice();

    dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: { totalPrice, newProduct: payload } });
}

/**
 * @param {object} product 
 * @param {number} quantity
 * @param {boolean} isPositive 
 * @returns 
 */
export const updateQuantity = (product, quantity, isPositive) => ({ 
    type: 'UPDATE_QUANTITY', 
    payload: { product, quantity, isPositive }
});

export const removeFromCart = payload => async dispatch => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { removedProduct: payload } });
}

export const removeAllFromCart = () => dispatch => {
    dispatch({ type: 'REMOVE_ALL_FROM_CART' });
}