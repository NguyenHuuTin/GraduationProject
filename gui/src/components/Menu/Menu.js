import React from 'react';
import './Menu.css'

function Menu(props) { 
    return (
        <div className='wrapper-main' tabIndex={1}>
            <aside className='aside-menu'>
                <div className='sidebar-brand'>
                    <a href='./' className='logo'>CURSUS</a>
                </div>
                <div className='menu'>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-gauge-high'></i>
                            <p className='content-item'>Dashboard</p>
                        </a>
                    </div>
                    <div className='menu-title'>
                        STARTER
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-address-book'></i>
                            <p className='content-item'>Role</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-regular fa-user'></i>
                            <p className='content-item'>User</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-language'></i>
                            <p className='content-item'>Languages</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-list'></i>
                            <p className='content-item'>Categories</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-boxes-stacked'></i>
                            <p className='content-item'>Sub Categories</p>
                        </a>
                    </div>
                    <div className='menu-title'>
                        STUDENT
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-user'></i>
                            <p className='content-item'>Student</p>
                        </a>
                    </div>
                    <div className='menu-title'>
                        INSTRUCTOR
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                        <i className='fa-solid fa-chalkboard-user'></i>
                            <p className='content-item'>Instructor</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-certificate'></i>
                            <p className='content-item'>Verification</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-book'></i>
                            <p className='content-item'>Payout</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-brands fa-paypal'></i>
                            <p className='content-item'>Course</p>
                        </a>
                    </div>
                    <div className='menu-title'>
                        EXTRA
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-gear'></i>
                            <p className='content-item'>Settings</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-file-word'></i>
                            <p className='content-item'>Report</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-comment'></i>
                            <p className='content-item'>Feedback</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-bell'></i>
                            <p className='content-item'>Notification Template</p>
                        </a>
                    </div>
                    <div className='item-menu'>
                        <a href='./'>
                            <i className='fa-solid fa-question'></i>
                            <p className='content-item'>FAQ</p>
                        </a>
                    </div>
                </div>
                {/* <div className='nicescroll-rails nicescroll-rails-vr item1'>
                    <div className='nicescroll-cursors item2'>
                    </div>
                </div> */}
                <div className='force-overflow'></div>
            </aside>
            
        </div>
        
    );
}

export default Menu;