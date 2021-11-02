import React from 'react';

import ImagesLayout from './ImagesLayout/ImagesLayout';
import LastestProducts from './LastestProducts/LastestProducts';

import './Home.css';

const Home = () => {
    return(
        <div className="Home">
            <ImagesLayout />
            <LastestProducts />
        </div>
    )
}

export default Home;