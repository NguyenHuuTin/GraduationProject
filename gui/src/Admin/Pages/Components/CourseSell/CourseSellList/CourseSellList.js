import React, { useEffect, useState } from "react";
import styles from "./CourseSellList.module.css";
import axios from "axios";

function CourseSellList(props) {
  const [courseSellList, setCourseSellList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/CourseSeller")
      .then((res) => {
        setCourseSellList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCourseSellList([]);
      });
  }, []);
  return (
    <div className={styles.cardCourseSellList}>
      <div className={styles.CourseSellListTitle}>CourseSell List</div>
      <div className={styles.CourseSellList}>
        <div className={styles.CourseSellListButtonSearch}>
          <div className={styles.CourseSellListButton}>
            <button className={styles.CourseSellButton}>Copy</button>
            <button className={styles.CourseSellButton}>CSV</button>
            <button className={styles.CourseSellButton}>Excel</button>
            <button className={styles.CourseSellButton}>Print</button>
          </div>
          <div className={styles.CourseSellListSearch}>
            <div className={styles.CourseSellTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.CourseSellInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.CourseSellListAll}>
          <div className={styles.headerCourseSellList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Student Name</div>
            <div className={styles.headerTitle}>Course Title</div>
            <div className={styles.headerDate}>Date</div>
            <div className={styles.headerPrice}>Price</div>
          </div>
          {courseSellList?.map((element, index) => {
            return (
              <div className={styles.itemCourseSellList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.studentName}</div>
                <div className={styles.itemTitle}>{element.courseTitle}</div>
                <div className={styles.itemDate}>{element.dateTime}</div>
                <div className={styles.itemPrice}>{element.price}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.CourseSellListPaging}></div>
    </div>
  );
}

export default CourseSellList;
