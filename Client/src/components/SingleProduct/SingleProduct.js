import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Axios from '../../utils/Axios';
import { serverMediaUrl } from '../../utils/serverMediaUrl';

import ProductButtons from '../ProductCard/ProductButtons/ProductButtons';

import LoadingGif from '../../assets/images/Loading.gif';

import './SingleProduct.css';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        Axios({ 
            method: 'GET',
            url: `/products/single/${ id }`
        })
        .then(res => {
            setProduct(res.data.product);
            setLoading(false);
        })
        .catch(err => console.log(err.response));
    }, [id]);

    return(
        <div className="SingleProduct">
            { loading ? <img src={ LoadingGif } style={ { margin: '0 auto' } } width="50" alt="" /> : <Fragment>
                <div className="product_image_container">
                    <img src={ `${ serverMediaUrl }/products/${ product.image }` } width="250" alt="" />
                </div>
                <div className="product_details">
                    <div className="upper_product_details">
                        <h1>{ product.title }</h1>
                        <pre>{ product.description }</pre>
                    </div>
                    <div className="lower_product_details">
                        <div style={ { display: 'flex', alignItems: 'flex-end' } }>
                            <input type="number" defaultValue="1" min="1" max="999" onChange={ e => setQuantity(e.target.value) } />
                            <h3>{ Number.isInteger(product.price) ? product.price * quantity : (product.price * quantity).toFixed(2) } ₪</h3>
                        </div>
                        { product.type == 1 ? product.quantity === 0 ? <h3 style={ { marginTop: 20, color: "red" } }>המוצר אזל במלאי</h3> : <ProductButtons _id={ product._id } quantity={ quantity } /> : <button className="button">הזמנה מראש</button> }
                        <span style={ { display: 'flex', alignItems: 'center', marginTop: 20 } }>
                            <p style={ { marginLeft: 5, color: 'var(--default-lightgrey-color)' } }>קטגוריה: </p>
                            <Link to={ `/category/${ product.category._id }?cName=${ product.category.categoryName }` } style={ { textDecoration: 'none', color: 'var(--default-blue-color)' } }>
                                { product.category.categoryName }
                            </Link>
                        </span>
                    </div>
                </div>
            </Fragment> }
        </div>
    )
}

export default SingleProduct;