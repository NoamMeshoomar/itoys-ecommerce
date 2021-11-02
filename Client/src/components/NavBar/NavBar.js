import React from 'react';

import NavBarUp from './NavBarUp/NavBarUp';
import NavBarDown from './NavBarDown/NavBarDown';

import './NavBar.css';

const NavBar = () => {
    return(
        <div className="NavBar">
            <NavBarUp />
            <NavBarDown />
        </div>
    )
}

export default NavBar;