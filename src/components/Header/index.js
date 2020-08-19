import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return <header className="header">
        <nav className="header__nav">
            <Link className="header__nav-link" to='/'><strong>Home</strong></Link>
        </nav>
    </header>
};

export default Header;