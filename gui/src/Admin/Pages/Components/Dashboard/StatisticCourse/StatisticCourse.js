import React from 'react';
import './StatisticCourse.css';

function StatisticCourse(props) {
    return (
        <div className='statistic-course-body'>
            <div className='card-statistic-course'>
                <div className='card-statistic-course-item'>
                    <div className='course-icon1'>
                        <i className='fa-solid fa-address-book icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Course</div>
                        <div className='count-course'>611</div>
                    </div>
                </div>
                <div className='card-statistic-course-item'>
                    <div className='course-icon2'>
                        <i className='fa-solid fa-hand icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Waiting For Approval</div>
                        <div className='count-course'>1</div>
                    </div>
                </div>
                <div className='card-statistic-course-item'>
                    <div className='course-icon3'>
                        <i className='fa-solid fa-ban icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Block</div>
                        <div className='count-course'>28</div>
                    </div>
                </div>
                <div className='card-statistic-course-item'>
                    <div className='course-icon4'>
                        <i className='fa-solid fa-trash-can icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Rejected</div>
                        <div className='count-course'>1</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticCourse;