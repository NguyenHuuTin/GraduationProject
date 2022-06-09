import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./Course.module.css";
import MyCourse from "./MyCourse/MyCourse";

function Course(props) {
  const item = styles.item;
  const itemClick = styles.itemClick;
  const [itemOne, setItemOne] = useState(true);
  const [itemTwo, setItemTwo] = useState(false);
  const [itemThree, setItemThree] = useState(false);
  const [itemFour, setItemFour] = useState(false);

  return (
    <div className={styles.courseBody}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-book"></i>
        </div>
        <div className={styles.textTitle}>Courses</div>
      </div>

      <div className={styles.bodyCreate}>
        <div className={styles.iconCourse}>
          <i className="fa-solid fa-book"></i>
        </div>
        <div className={styles.createTitle}>Jump Into Course Creation</div>
        <div>
          <button className={styles.createBtn}>Create Your Course</button>
        </div>
      </div>

      <div className={styles.listBtn}>
        <Link to={"."} className={styles.itemBtn}>
          <div
            className={itemOne ? itemClick : item}
            onClick={() => {
              setItemOne(true);
              setItemTwo(false);
              setItemThree(false);
              setItemFour(false);
            }}
          >
            <i className="fa-solid fa-book"></i>
            My Courses
          </div>
        </Link>
        <Link to={"draft"} className={styles.itemBtn}>
          <div
            className={itemTwo ? itemClick : item}
            onClick={() => {
                setItemOne(false);
                setItemTwo(true);
                setItemThree(false);
                setItemFour(false);
            }}
          >
            <i className="fa-solid fa-download"></i>
            Drafts
          </div>
        </Link>
        <Link to={"discount"} className={styles.itemBtn}>
          <div
            className={itemThree ? itemClick : item}
            onClick={() => {
                setItemOne(false);
                setItemTwo(false);
                setItemThree(true);
                setItemFour(false);
            }}
          >
            <i className="fa-solid fa-tag"></i>
            Discounts
          </div>
        </Link>

        <Link to={"promotion"} className={styles.itemBtn}>
          <div
            className={itemFour ? itemClick : item}
            onClick={() => {
                setItemOne(false);
                setItemTwo(false);
                setItemThree(false);
                setItemFour(true);
            }}
          >
            <i className="fa-solid fa-bullhorn"></i>
            Promotions
          </div>
        </Link>
      </div>

      <div className={styles.courseList}>
          <Routes>
              <Route index element={<MyCourse/>}/>
              <Route path="draft" element={<MyCourse/>}/>
              <Route path="discount" element={<MyCourse/>}/>
              <Route path="promotion" element={<MyCourse/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default Course;
