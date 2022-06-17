import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./Course.module.css";
import MyCourse from "./MyCourse/MyCourse";
import DraftCourse from "./DraftCourse/DraftCourse";

function Course(props) {
  const item = styles.item;
  const itemClick = styles.itemClick;
  const [itemOne, setItemOne] = useState(true);
  const [itemTwo, setItemTwo] = useState(false);
  // const [itemThree, setItemThree] = useState(false);
  // const [itemFour, setItemFour] = useState(false);

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
          <Link to={"/instructorpage/createCourse"}><button className={styles.createBtn}>Create Your Course</button></Link>
        </div>
      </div>

      <div className={styles.listBtn}>
        <Link to={"."} className={styles.itemBtn}>
          <div
            className={itemOne ? itemClick : item}
            onClick={() => {
              setItemOne(true);
              setItemTwo(false);
              // setItemThree(false);
              // setItemFour(false);
            }}
          >
            <i className="fa-solid fa-book" style={{marginRight: 10}}></i>
            My Courses
          </div>
        </Link>
        <Link to={"draft"} className={styles.itemBtn}>
          <div
            className={itemTwo ? itemClick : item}
            onClick={() => {
                setItemOne(false);
                setItemTwo(true);
                // setItemThree(false);
                // setItemFour(false);
            }}
          >
            <i className="fa-solid fa-download" style={{marginRight: 10}}></i>
            Drafts
          </div>
        </Link>
      </div>

      <div className={styles.courseList}>
          <Routes>
              <Route index element={<MyCourse/>}/>
              <Route path="draft" element={<DraftCourse/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default Course;
