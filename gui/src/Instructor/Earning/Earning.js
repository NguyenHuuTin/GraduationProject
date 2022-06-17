import React, { useEffect, useState } from "react";
import styles from "./Earning.module.css";
import axios from "axios";

function Earning(props) {
  const [earning, setEarning] = useState();
  const [listEarning, setListEarning] = useState();
  const [topCourse, setTopCourse] = useState();
  const token = localStorage.token;

  useEffect(() => {
    axios
      .get("http://localhost:57678/Earning", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEarning(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:57678/ListEarning", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListEarning(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:57678/ListTopCourse", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTopCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-dollar-sign"></i>
        </div>
        <div className={styles.textTitle}>Earning</div>
      </div>

      <div className={styles.earning}>
        <div className={styles.itemEarning}>
          <div className={styles.earningValue}>
            <div className={styles.titleEarning}>Sales earnings</div>
            <div className={styles.numEarning}>
              ${earning && earning.salesEarnings}
            </div>
          </div>
        </div>
        <div className={styles.itemEarning}>
          <div className={styles.earningValue}>
            <div className={styles.titleEarning}>Your earning</div>
            <div className={styles.numEarning}>
              ${earning && earning.yourEarning}
            </div>
          </div>
        </div>
        <div className={styles.itemEarning}>
          <div className={styles.earningValue}>
            <div className={styles.titleEarning}>Admin commission</div>
            <div className={styles.numEarning}>
              ${earning && earning.adminCommission}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.orderDetail}>
        <div className={styles.topCourse}>
          <div className={styles.headerTopCourse}>Your Top Course</div>
          <div className={styles.header}>
            <div className={styles.itemHeaderTitle}>Title</div>
            <div className={styles.itemHeader}>Count</div>
            <div className={styles.itemHeader}>Price</div>
          </div>
          {topCourse &&
            topCourse.map((element) => {
              return (
                <div className={styles.itemTop}>
                  <div className={styles.itemTopCourseTitle}>{element.title}</div>
                  <div className={styles.itemTopCourse}>{element.count}</div>
                  <div className={styles.itemTopCourse}>{element.price}</div>
                </div>
              );
            })}
        </div>
        <div className={styles.order}>
          <div className={styles.header}>
            <div className={styles.itemHeader}>Date</div>
            <div className={styles.itemHeader}>Item sales count</div>
            <div className={styles.itemHeader}>Earning</div>
          </div>
          {listEarning &&
            listEarning.map((item) => {
              return (
                <div className={styles.item}>
                  <div className={styles.itemContent}>{item.day}</div>
                  <div className={styles.itemContent}>{item.itemSalesCount}</div>
                  <div className={styles.itemContent}>{item.earning} $</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Earning;
