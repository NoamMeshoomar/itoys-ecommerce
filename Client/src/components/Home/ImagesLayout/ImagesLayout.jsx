import React from 'react';
import { Link } from 'react-router-dom';

// import MainBanner from '../../../assets/images/Main-Banner.jpg';
import DollBanner from '../../../assets/images/Doll-Banner.jpg';
import LegoBanner from '../../../assets/images/Lego-Banner.jpg';
import ElectronicsBanner from '../../../assets/images/Electronics-Banner.jpg';

import './ImagesLayout.css';

const ImagesLayout = () => {
    return(
        <div className="ImagesLayout">
            {/* <div className="main__banner">
                <img src={ MainBanner } width="1220" alt=""/>
            </div> */}
            <div className="link__images">
                <Link to="/category?c=dolls">
                    <img src={ DollBanner } alt=""/>
                </Link>
                <Link to="/category?c=toys">
                    <img src={ LegoBanner } alt=""/>
                </Link>
                <Link to="/category?c=electronics">
                    <img src={ ElectronicsBanner } alt=""/>
                </Link>
            </div>
        </div>
    )
}

export default ImagesLayout;