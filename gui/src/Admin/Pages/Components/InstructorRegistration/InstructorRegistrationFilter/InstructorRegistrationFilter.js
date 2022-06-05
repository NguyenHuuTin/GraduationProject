import React from "react";
import styles from "./InstructorRegistrationFilter.module.css";

function InstructorRegistrationFilter(props) {
  return (
    <div className={styles.filterBody}>
      <div className={styles.filterMain}>
        <div className={styles.titleFilter}>Filter</div>
        <div className={styles.filterInput}>
          <div className={styles.itemInput}>
            <label>From Date</label>
            <input
              type="date"
              name="from"
              class={styles.inputDate}
              required=""
            ></input>
          </div>
          <div className={styles.itemInput}>
            <label>To Date</label>
            <input
              type="date"
              name="from"
              class={styles.inputDate}
              required=""
            ></input>
          </div>
        </div>
        <div className={styles.itemSubmit}>
            <button className={styles.btnSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default InstructorRegistrationFilter;
