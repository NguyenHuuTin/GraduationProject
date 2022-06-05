import React from 'react';
import './Total.css';

function Total(props) {
    return (
        <div className='card-body'>
            <div className='card-statistical'>
                <div className='card-statistical-item'>
                    <div className='item-icon1'>
                        <i className='fa-regular fa-user icon'></i>
                    </div>
                    <div className='statistical-item-content'>
                        <div>Total Admin</div>
                        <div className='count'>21</div>
                    </div>
                </div>
                <div className='card-statistical-item'>
                    <div className='item-icon2'>
                        <i className='fa-solid fa-chalkboard-user icon'></i>
                    </div>
                    <div className='statistical-item-content'>
                        <div>Total Instructor</div>
                        <div className='count'>49</div>
                    </div>
                </div>
                <div className='card-statistical-item'>
                    <div className='item-icon3'>
                        <i className='fa-solid fa-user icon'></i>
                    </div>
                    <div className='statistical-item-content'>
                        <div>Total Student</div>
                        <div className='count'>63</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Total;