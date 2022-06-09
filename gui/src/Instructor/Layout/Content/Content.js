import React from "react";
import styles from  "./Content.module.css";
import Dashboard from "../../Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Course from "../../Course/Course";
import Analytic from "../../Analytic/Analytic";
import CreateCourse from "../../CreateCourse/CreateCourse";

function Content(props) {
  return (
    <div className={styles.content}>    
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="course/*" element={<Course/>}/>
        <Route path="analytic/*" element={<Analytic/>}/>
        <Route path="createCourse/*" element={<CreateCourse/>}/>
      </Routes>
        
    </div>
  );
}

export default Content;
