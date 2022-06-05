import React from 'react';
import './Dashboard.css'
import Total from './Total/Total';
import Chart from './Chart/Chart';
import StatisticCourse from './StatisticCourse/StatisticCourse';
import TopCourse from './TopCourse/TopCourse';
import TopInstructor from './TopInstructor/TopInstructor';
import StatisticCategory from './StatisticCategory/StatisticCategory';

function Dashboard(props) {
    return (
        <div className='card-content-dashboard'>
            <div className='card-header-dashboard'>
                <h2 className='header-title-dashboard'>Dashboard</h2>
                <div className='header-path-dashboard'>
                    <div className='header-path-item-dashboard active'>
                        <a href='./' className='item-content-dashboard active'>
                            Home
                        </a>
                    </div>
                    /
                    <div className='header-path-item-dashboard'>
                        <a href='./' className='item-content-dashboard'>
                            Dashboard
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <Total/>
            </div>
            <div>
                <Chart/>
            </div>
            <div>
                <StatisticCourse/>
            </div>
            <div className='top-five-body'>
                <div className='top-Course'>
                    <TopCourse/>
                </div>
                <div className='top-instructor'>
                    <TopInstructor/>
                </div>
            </div>
            <div>
                <StatisticCategory/>
            </div>
        </div>
    );
}

export default Dashboard;