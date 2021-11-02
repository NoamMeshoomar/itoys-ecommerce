import React from 'react';

import YouTubeIcon from '../../assets/icons/youtube.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';

import './Footer.css';

const Footer = () => {
    return(
        <footer className="Footer">
            <div className="footer__container">
                <h3>©️ כל הזכויות שמורות ל- itoys.co.il</h3>
                <div className="footer__icons">
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                        <img src={ YouTubeIcon } width="30" height="30" alt=""/>
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <img src={ FacebookIcon } width="30" height="30" alt=""/>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <img src={ InstagramIcon } width="30" height="30" alt=""/>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;