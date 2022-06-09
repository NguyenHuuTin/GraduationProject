import React, { useEffect, useState } from 'react';
import './StatisticCourse.css';
import axios from 'axios';

function StatisticCourse(props) {
    const [active, setActive] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:57678/ActiveCourse")
      .then((res) => {
        setActive(res.data.length);
      })
      .catch(() => {
        setActive(0);
      });
  }, []);

  const [wait, setWait] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:57678/ApproveCourse")
      .then((res) => {
        setWait(res.data.length);
      })
      .catch(() => {
        setWait([]);
      });
  }, []);

  const [block, setBlock] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:57678/BlockCourse")
      .then((res) => {
        setBlock(res.data.length);
      })
      .catch(() => {
        setBlock(0);
      });
  }, []);

  const [reject, setReject] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:57678/RejectedCourse")
      .then((res) => {
        setReject(res.data.length);
      })
      .catch(() => {
        setReject(0);
      });
  }, []);
    return (
        <div className='statistic-course-body'>
            <div className='card-statistic-course'>
                <div className='card-statistic-course-item'>
                    <div className='course-icon1'>
                        <i className='fa-solid fa-address-book icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Course</div>
                        <div className='count-course'>{active}</div>
                    </div>
                </div>
                <div className='card-statistic-course-item'>
                    <div className='course-icon2'>
                        <i className='fa-solid fa-hand icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Waiting For Approval</div>
                        <div className='count-course'>{wait}</div>
                    </div>
                </div>
                <div className='card-statistic-course-item'>
                    <div className='course-icon3'>
                        <i className='fa-solid fa-ban icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Block</div>
                        <div className='count-course'>{block}</div>
                    </div>
                </div>
                <div className='card-statistic-course-item'>
                    <div className='course-icon4'>
                        <i className='fa-solid fa-trash-can icon-course'></i>
                    </div>
                    <div className='statistic-course-item-content'>
                        <div>Rejected</div>
                        <div className='count-course'>{reject}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticCourse;