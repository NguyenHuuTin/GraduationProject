import React from "react";
import styles from "./CourseList.module.css";
import {Outlet } from "react-router-dom";

function CourseList(props) {
  return (
    <div className={styles.cardCourseList}>
      <div className={styles.CourseListTitle}>Course List</div>
      <div className={styles.CourseList}>
        <div className={styles.CourseListButtonSearch}>
          <div className={styles.CourseListButton}>
            <button className={styles.CourseButton}>Copy</button>
            <button className={styles.CourseButton}>CSV</button>
            <button className={styles.CourseButton}>Excel</button>
            <button className={styles.CourseButton}>Print</button>
          </div>
          <div className={styles.CourseListSearch}>
            <div className={styles.CourseTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.CourseInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <div className={styles.CourseListPaging}></div>
    </div>
  );
}

export default CourseList;
