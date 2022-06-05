import React from "react";
import styles from "./SubscriptionFilter.module.css";

function SubscriptionFilter(props) {
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
          <div className={styles.itemInput}>
            <label>Subscription</label>
            <select className={styles.inputTitle}></select>
          </div>
        </div>
        <div className={styles.itemSubmit}>
            <button className={styles.btnSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionFilter;
