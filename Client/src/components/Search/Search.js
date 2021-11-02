import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from '../../utils/Axios';

import ProductCard from '../ProductCard/ProductCard';

import loadingGif from '../../assets/images/Loading.gif';

import './Search.css';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchText = useSelector(state => state.search);

    useEffect(() => {
        setLoading(true);
        Axios({
            method: 'POST',
            url: '/products/search',
            data: {
                searchQuery: searchText
            }
        })
        .then(res => {
            setProducts(res.data.products);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, [searchText]);

    return(
        <div className="Search">
            { loading ? <div style={ { width: '100%', textAlign: 'center' } }><img src={ loadingGif } width="50" alt=""/></div> : <Fragment>
                <h1 style={ { marginBottom: 20, fontSize: 28, fontWeight: 500, color: 'var(--default-grey-color)' } }>תוצאות חיפוש ל- "{ searchText }"</h1>
                <div className="products__grid">
                    { products.map(product => {
                        return <ProductCard
                            key={ product._id }
                            _id={ product._id } 
                            id={ product.id } 
                            image={ product.image } 
                            title={ product.title } 
                            price={ product.price } 
                        />
                    }) }
                </div>
            </Fragment> }
        </div>
    )
}

export default Search;