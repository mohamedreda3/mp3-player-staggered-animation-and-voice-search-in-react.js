import React, { useState, useEffect } from 'react'
import logo from '../assets/images/logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import { setStickNavbar } from '../functions/stickynavbar';
import { Link } from 'react-router-dom';
function Header() {
    const [sticky, setSticky] = useState(false);
    useEffect(() => {
        window.onscroll = function () {
            if (setStickNavbar() > 0.8 ) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }
    });
    return (
        <header className={sticky ? 'header sticky' : 'header'}>
            <nav>
                <Link to='/' className='title'>
                    <p>تلاوات</p>
                    <div className="logo">
                        <img src={logo} />
                    </div>
                </Link>
            </nav>
        </header>
    )
}

export default Header