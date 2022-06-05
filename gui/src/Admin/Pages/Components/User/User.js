import React from 'react';
import './User.css';
import UserList from './UserList/UserList';
import {Link, Outlet} from 'react-router-dom'
function User(props) {
    return (
        <>
            <div className='card-content-user'>
                <div className='card-header-user'>
                    <h2 className='header-title-user'>Users</h2>
                    <div className='header-path-user'>
                        <div className='header-path-item-user active'>
                            <Link to={".."} className='item-content-user active'>
                                Home
                            </Link>
                        </div>
                        /
                        <div className='header-path-item-user'>
                            <Link to={"/user"} className='item-content-user'>
                                User
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='user-main'>
                    <div className='user-main-user-list'>
                        <UserList/>
                    </div>
                    <div className='user-main-add-new-user'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;