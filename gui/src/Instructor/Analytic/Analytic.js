import React from "react";
import styles from "./Analytic.module.css";

function Analytic(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-chart-line"></i>
        </div>
        <div className={styles.textTitle}>Analytics</div>
      </div>

      <div className={styles.analyticCard}>
        <div className={styles.cardItem}>
          <div className={styles.itemNumber}>1</div>
          <div className={styles.itemTitle}>Subscription</div>
          <div className={styles.itemChart}>
           
          </div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.itemNumber}>0</div>
          <div className={styles.itemTitle}>Weekly Earning</div>
          <div className={styles.itemChart}></div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.itemNumber}>0</div>
          <div className={styles.itemTitle}>Weekly Sales</div>
          <div className={styles.itemChart}></div>
        </div>
      </div>
      <div className={styles.chartMain}>
          <div className={styles.chartTitle}>Sales Of The Year</div>
          <div className={styles.chartBody}></div>
      </div>
    </div>
  );
}

export default Analytic;
