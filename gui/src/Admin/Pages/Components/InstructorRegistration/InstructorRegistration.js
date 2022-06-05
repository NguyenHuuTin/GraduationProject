import React from "react";
import styles from "./InstructorRegistration.module.css";
import { Link } from "react-router-dom";
import InstructorRegistrationList from "./InstructorRegistrationList/InstructorRegistrationList";
import InstructorRegistrationFilter from "./InstructorRegistrationFilter/InstructorRegistrationFilter";

function InstructorRegistration(props) {
  return (
    <div className={styles.cardContentInstructorRegistration}>
      <div className={styles.cardHeaderInstructorRegistration}>
        <h2 className={styles.headerTitleInstructorRegistration}>Instructor Registration Report</h2>
        <div className={styles.headerPathInstructorRegistration}>
          <div className={styles.headerPathItemInstructorRegistration}>
            <Link to={".."} className={styles.itemContentInstructorRegistrationActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemInstructorRegistration}>
            <Link to={"/InstructorRegistration"} className={styles.itemContentInstructorRegistration}>
              InstructorRegistration
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.InstructorRegistrationMain}>
        <div className={styles.InstructorRegistrationMainFilter}>
          <InstructorRegistrationFilter />
        </div>
        <div className={styles.InstructorRegistrationMainInstructorRegistrationList}>
          <InstructorRegistrationList />
        </div>
      </div>
    </div>
  );
}

export default InstructorRegistration;
