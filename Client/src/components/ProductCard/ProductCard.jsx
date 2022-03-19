import React from 'react';
import { Link } from 'react-router-dom';

import { useInStock } from '../../hooks/useInStock';

import { serverMediaUrl } from '../../utils/serverMediaUrl';

import ProductButtons from './ProductButtons/ProductButtons';

import './ProductCard.css';

const ProductCard = ({product}) => {
    const inStock = useInStock(product._id, product.quantity);

    return(
        <div className="ProductCard">
            <Link to={`/product/${product?.id}`}>
                <img src={`${serverMediaUrl}/products/${product?.id + product?.imageType}`} alt={product?.title} />
            </Link>
            <div className="bottom__information">
                <Link to={`/product/${product?.id}`}>
                    <h3 className="product__title">{product?.title}</h3>
                    <h3 className="product__price">{product?.price.toFixed(2)} ₪</h3>
                </Link>
                {inStock ? <ProductButtons _id={product._id} /> : <h3 style={{textAlign: "center", marginTop: 20, color: "red", fontWeight: 400 } }>אזל במלאי</h3> }
            </div>
        </div>
    )
}

export default ProductCard;