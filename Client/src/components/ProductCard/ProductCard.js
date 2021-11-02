import React from 'react';
import { Link } from 'react-router-dom';

import { serverMediaUrl } from '../../utils/serverMediaUrl';

import ProductButtons from './ProductButtons/ProductButtons';

import './ProductCard.css';

const ProductCard = ({ _id, id, image, title, price }) => {
    return(
        <div className="ProductCard">
            <Link to={ `/product/${ id }` }>
                <img src={ `${ serverMediaUrl }/products/${ image }` } alt=""/>
            </Link>
            <div className="bottom__information">
                <Link to={ `/product/${ id }` }>
                    <h3 className="product__title">{ title }</h3>
                    <h3 className="product__price">{ price } ₪</h3>
                </Link>
                <ProductButtons _id={ _id } />
            </div>
        </div>
    )
}

export default ProductCard;