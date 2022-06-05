import React from "react";
import styles from "./StudentRegistration.module.css";
import { Link } from "react-router-dom";
import StudentRegistrationList from "./StudentRegistrationList/StudentRegistrationList";
import StudentRegistrationFilter from "./StudentRegistrationFilter/StudentRegistrationFilter";

function StudentRegistration(props) {
  return (
    <div className={styles.cardContentStudentRegistration}>
      <div className={styles.cardHeaderStudentRegistration}>
        <h2 className={styles.headerTitleStudentRegistration}>Student Registration Report</h2>
        <div className={styles.headerPathStudentRegistration}>
          <div className={styles.headerPathItemStudentRegistration}>
            <Link to={".."} className={styles.itemContentStudentRegistrationActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemStudentRegistration}>
            <Link to={"/StudentRegistration"} className={styles.itemContentStudentRegistration}>
              Student Registration
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.StudentRegistrationMain}>
        <div className={styles.StudentRegistrationMainFilter}>
          <StudentRegistrationFilter />
        </div>
        <div className={styles.StudentRegistrationMainStudentRegistrationList}>
          <StudentRegistrationList />
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
