import React from 'react';
import styles from './Course.module.css';
import {Link, Route, Routes} from 'react-router-dom';
import AllCourse from './AllCourse/AllCourse';
import WaitingForApproveCourse from './WaitingForApproveCourse/WaitingForApproveCourse';
import ActiveCourse from './ActiveCourse/ActiveCourse';
import BlockCourse from './BlockCourse/BlockCourse';
import RejectCourse from './RejectCourse/RejectCourse';

function Course(props) {
    return (
        <div className={styles.cardContentCourse}>
      <div className={styles.cardHeaderCourse}>
        <h2 className={styles.headerTitleCourse}>Course</h2>
        <div className={styles.headerPathCourse}>
          <div className={styles.headerPathItemCourse}>
            <Link to={".."} className={styles.itemContentCourseActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemCourse}>
            <Link to={"/Course"} className={styles.itemContentCourse}>
              Course
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.CourseMain}>
        <div className={styles.CourseMainCourseList}>
         <Routes>
            <Route index element={<AllCourse />} />
            <Route path="wait" element={<WaitingForApproveCourse />} />
            <Route path="active" element={<ActiveCourse />} />
            <Route path="block" element={<BlockCourse />} />
            <Route path="reject" element={<RejectCourse />} />
         </Routes>
        </div>
      </div>
    </div>
    );
}

export default Course;