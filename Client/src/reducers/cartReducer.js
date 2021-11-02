const INITIAL_STATE = {
    totalPrice: 0,
    products: []
}

const CartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_CART_PRODUCTS':
            return state = { ...state, totalPrice: action.payload.totalPrice, products: action.payload.products };
        case 'ADD_PRODUCT_TO_CART':
            return { ...state, totalPrice: action.payload.totalPrice, products: [...state.products, action.payload.newProduct] };
        case 'UPDATE_QUANTITY':
            const { product, quantity, isPositive } = action.payload;
            const price = product.productId.price;
            const filteredItem = state.products.find(product => product._id === action.payload.product._id);
            if(isPositive)
                filteredItem.quantity += quantity;
            else
                filteredItem.quantity -= quantity;
            return state = { ...state, totalPrice: isPositive ? state.totalPrice += (price * quantity) : state.totalPrice -= (price * quantity) };
        case 'REMOVE_FROM_CART':
            const removedItem = state.products.find(item => item._id === action.payload.removedProduct);
            const removeFromTotalPrice = removedItem.productId.price * removedItem.quantity;
            return state = { ...state, totalPrice: state.totalPrice - removeFromTotalPrice, products: state.products.filter(item => item._id !== action.payload.removedProduct) };
        case 'REMOVE_ALL_FROM_CART':
            return state = INITIAL_STATE;
        default:
            return state;
    }
}

export default CartReducer;