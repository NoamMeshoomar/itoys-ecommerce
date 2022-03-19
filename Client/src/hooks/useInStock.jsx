import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useInStock = (productId, productQuantity) => {
    const [inStock, setInStock] = useState(false);

    const cartProducts = useSelector(state => state.cart);

    const productInStock = (quantity, cartQuantity) => {
        if(quantity === 0) 
            return false;
        else if(quantity > cartQuantity)
            return true;
        return false;
    }

    useEffect(() => {
        const inCart = cartProducts.products.find(product => product.productId._id === productId);
        if(inCart) {
            setInStock(productInStock(productQuantity, inCart.quantity));
        } else {
            if(productQuantity > 0) {
                setInStock(true);
            }
        }
    }, [productId, productQuantity, cartProducts]);

    return inStock;
}