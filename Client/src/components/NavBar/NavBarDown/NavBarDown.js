import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import downArrowIcon from '../../../assets/icons/down-arrow.svg';

import './NavBarDown.css';

const NavBarDown = () => {
    const [open, setOpen] = useState(false);

    const closeNavBarMobile = () => setOpen(false);

    const categories = useSelector(state => state.categories);

    return(
        <nav className="NavBarDown">
            <button className="open_button" onClick={ () => setOpen(!open) }><img src={ downArrowIcon } style={ open ? { transform: 'scale(-1)' }: null } width="25" alt="" /></button>
            <ul className="links" style={ open ? { display: 'block' } : null }>
                { categories.map(category => {
                    return(
                        <li key={ category._id } onClick={ closeNavBarMobile }>
                            <Link to={ `/category/${ category._id }?cName=${ category.categoryName }` }>
                                { category.categoryName }
                            </Link>
                        </li>
                    )
                }) }
            </ul>
        </nav>
    )
}

export default NavBarDown;