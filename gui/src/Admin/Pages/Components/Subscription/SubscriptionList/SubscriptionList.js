import React, { useEffect, useState } from "react";
import styles from "./SubscriptionList.module.css";
import axios from "axios";

function SubscriptionList(props) {
  const [SubscriptionList, setSubscriptionList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Subscription")
      .then((res) => {
        setSubscriptionList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setSubscriptionList([]);
      });
  }, []);
  return (
    <div className={styles.cardSubscriptionList}>
      <div className={styles.SubscriptionListTitle}>Subscription List</div>
      <div className={styles.SubscriptionList}>
        <div className={styles.SubscriptionListButtonSearch}>
          <div className={styles.SubscriptionListButton}>
            <button className={styles.SubscriptionButton}>Copy</button>
            <button className={styles.SubscriptionButton}>CSV</button>
            <button className={styles.SubscriptionButton}>Excel</button>
            <button className={styles.SubscriptionButton}>Print</button>
          </div>
          <div className={styles.SubscriptionListSearch}>
            <div className={styles.SubscriptionTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.SubscriptionInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.SubscriptionListAll}>
          <div className={styles.headerSubscriptionList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Student Name</div>
            <div className={styles.headerInstructorName}>Instructor Name</div>
            <div className={styles.headerDate}>Date</div>
          </div>
          {SubscriptionList?.map((element, index) => {
            return (
              <div className={styles.itemSubscriptionList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.studentName}</div>
                <div className={styles.itemInstructorName}>{element.instructorName}</div>
                <div className={styles.itemDate}>{element.dateTime}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.SubscriptionListPaging}></div>
    </div>
  );
}

export default SubscriptionList;
