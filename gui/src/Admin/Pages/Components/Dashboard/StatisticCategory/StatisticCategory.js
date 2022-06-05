import React from 'react';
import './StatisticCategory.css';

function StatisticCategory(props) {
    return (
        <div className='statistic-category-body'>
            <div className='card-statistic-category'>
                <div className='card-statistic-category-item'>
                    <div className='item-icon-category1'>
                        <i className='fa-solid fa-language icon-category'></i>
                    </div>
                    <div className='statistic-category-item-content'>
                        <div>Language</div>
                        <div className='count-statistic-category'>37</div>
                    </div>
                </div>
                <div className='card-statistic-category-item'>
                    <div className='item-icon-category2'>
                        <i className='fa-solid fa-list icon-category'></i>
                    </div>
                    <div className='statistic-category-item-content'>
                        <div>Category</div>
                        <div className='count-statistic-category'>24</div>
                    </div>
                </div>
                <div className='card-statistic-category-item'>
                    <div className='item-icon-category3'>
                        <i className='fa-solid fa-boxes-stacked icon-category'></i>
                    </div>
                    <div className='statistic-category-item-content'>
                        <div>SubCategory</div>
                        <div className='count-statistic-category'>16</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticCategory;