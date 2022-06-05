import React, { useEffect, useState } from "react";
import styles from "./WaitingForApproveCourse.module.css";
import axios from "axios";

function WaitingForApproveCourse(props) {
  const [CourseList, setCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/ApproveCourse")
      .then((res) => {
        setCourseList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCourseList([]);
      });
  }, []);
  return (
    <div className={styles.CourseListAll}>
      <div className={styles.headerCourseList}>
        <div className={styles.headerID}>#</div>
        <div className={styles.headerTitle}>Title</div>
        <div className={styles.headerCategory}>Category</div>
        <div className={styles.headerPrice}>Price</div>
        <div className={styles.headerStatus}>Status</div>
        <div className={styles.headerUpdate}>Last Update</div>
        <div className={styles.headerAction}>Action</div>
      </div>
      {CourseList?.map((element, index) => {
        return (
          <div className={styles.itemCourseList} key={element.id}>
            <div className={styles.itemID}>{index + 1}</div>
            <div className={styles.itemTitle}>{element.title}</div>
            <div className={styles.itemCategory}>{element.category}</div>
            <div className={styles.itemPrice}>{element.price}</div>
            <div className={styles.itemStatus}>{element.status}</div>
            <div className={styles.itemUpdate}>{element.updateAt}</div>
            {element.status === "Waiting for approved" ? (
              <div className={styles.itemAction}>
                <button className={styles.buttonActionView}>View</button>
                <button className={styles.buttonActionActive}>Active</button>
                <button className={styles.buttonActionReject}>Reject</button>
              </div>
            ) : element.status === "Active" ? (
              <div className={styles.itemAction}>
                <button className={styles.buttonActionView}>View</button>
                <button className={styles.buttonActionBlock}>Block</button>
              </div>
            ) : element.status === "Block" ? (
              <div className={styles.itemAction}>
                <button className={styles.buttonActionView}>View</button>
                <button className={styles.buttonActionBlock}>
                  UnBlock/Active
                </button>
              </div>
            ) : element.status === "Reject" ? (
              <div className={styles.itemAction}>
                <button className={styles.buttonActionView}>View</button>
                <button className={styles.buttonActionActive}>Active</button>
              </div>
            ) : (
              <div className={styles.itemAction}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WaitingForApproveCourse;
