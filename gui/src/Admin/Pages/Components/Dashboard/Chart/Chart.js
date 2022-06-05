import React from 'react';
import './Chart.css';

function Chart(props) {
    return (
        <div className='chart'>
            <div className='chart-body'>
                <div className='chart-title'>
                    <p>Statistics</p>
                </div>
                <div className='chart-content'>
                    This is Chart Statistics
                </div>
            </div>
        </div>
    );
}

export default Chart;