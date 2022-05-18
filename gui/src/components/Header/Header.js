import React from 'react';
import './Header.css'
function Header(props) {
    return (
        <div className='header'>
            <div className='body'>
                <i className='fa-solid fa-bars'></i>
                <div className='account'>
                    <div className='item-header'>
                        <i className='fa-solid fa-language'></i>
                    </div>
                    <div className='item-header'>
                        <img alt='img_user' src="https://coursearly.com/cursus/public/upload/image/60dee1e59cf8d.png"/>
                        <p className='user'>Hi, Admin</p>
                    </div>
                    <div className='item-header'>
                        <i className='fa-solid fa-caret-down'></i>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Header;