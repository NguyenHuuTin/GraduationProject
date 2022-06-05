import React from "react";
import styles from "./CourseSell.module.css";
import { Link } from "react-router-dom";
import CourseSellList from "./CourseSellList/CourseSellList";
import CourseSellFilter from "./CourseSellFilter/CourseSellFilter";

function CourseSell(props) {
  return (
    <div className={styles.cardContentCourseSell}>
      <div className={styles.cardHeaderCourseSell}>
        <h2 className={styles.headerTitleCourseSell}>Course Sell Report</h2>
        <div className={styles.headerPathCourseSell}>
          <div className={styles.headerPathItemCourseSell}>
            <Link to={".."} className={styles.itemContentCourseSellActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemCourseSell}>
            <Link to={"/CourseSell"} className={styles.itemContentCourseSell}>
              CourseSell
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.CourseSellMain}>
        <div className={styles.CourseSellMainFilter}>
          <CourseSellFilter />
        </div>
        <div className={styles.CourseSellMainCourseSellList}>
          <CourseSellList />
        </div>
      </div>
    </div>
  );
}

export default CourseSell;
