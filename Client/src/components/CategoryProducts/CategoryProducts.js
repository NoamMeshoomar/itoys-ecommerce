import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../utils/Axios';
import ProductCard from '../ProductCard/ProductCard';

import LoadingGif from '../../assets/images/Loading.gif';

import './CategoryProducts.css';

const CategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const limit = 16;

    useEffect(() => {
        setLoading(true);
        
        Axios({
            method: 'GET',
            url: `/products/category/${ id }?skip=${ skip }&limit=${ limit }`
        })
        .then(res => {
            setProducts(res.data.products);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [id, skip]);

    return(
        <div className="CategoryProducts">
            { loading ? <div style={ { width: '100%', margin: '0 auto', textAlign: 'center' } }><img src={ LoadingGif } width="50" alt=""/></div> : <>
                { products.length === 0 ? <h1 style={ { color: 'var(--default-grey-color)', fontSize: 28, fontWeight: 500 } }>לא נמצאו מוצרים בקטגוריה זו</h1> : <div className="products__grid">
                    { products.map(product => {
                        return <ProductCard key={ product._id } product={product} />
                    }) }
                </div> }
            </> }
        </div>
    )
}

export default CategoryProducts;