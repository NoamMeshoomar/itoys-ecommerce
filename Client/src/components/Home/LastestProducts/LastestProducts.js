import React, { useEffect, useState } from 'react';
import Axios from '../../../utils/Axios';

import ProductCard from '../../ProductCard/ProductCard';

import LoadingGif from '../../../assets/images/Loading.gif'

import './LastestProducts.css';

const LastestProducts = () => {
    const [lastestProducts, setLastestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/products/lastest?limit=8'
        })
        .then(res => {
            setLastestProducts(res.data.products);
            setLoading(false);
        })
        .catch(err => console.error(err.response));
    }, []);

    return(
        <div className="LastestProducts">
            <h1>המוצרים האחרונים</h1>
            { loading ? <img src={ LoadingGif } width="50" alt="" /> : 
                <div className="products__grid">
                    { lastestProducts.map(product => {
                        return <ProductCard 
                            key={ product._id }
                            _id={ product._id }
                            id={ product.id } 
                            image={ product.image } 
                            title={ product.title } 
                            price={ product.price } 
                        />
                    }) }
                </div> }
        </div>
    )
}

export default LastestProducts;