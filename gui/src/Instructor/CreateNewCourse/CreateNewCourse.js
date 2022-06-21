import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./CreateNewCourse.module.css";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import CreateCourseContent from "./CreateCourseContent/CreateCourseContent";

function CreateNewCourse(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-circle-plus"></i>
        </div>
        <div className={styles.textTitle}>Create New Course</div>
      </div>

      <div className={styles.body}>
        <Routes>
            <Route index path="/*" element={<GeneralInfo/>}/>
            <Route path="/:id" element={<CreateCourseContent/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default CreateNewCourse;
