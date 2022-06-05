import React from 'react';
import styles from './Course.module.css';
import {Link} from 'react-router-dom';
import CourseList from './CourseList/CourseList';

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
          <CourseList/>
        </div>
      </div>
    </div>
    );
}

export default Course;