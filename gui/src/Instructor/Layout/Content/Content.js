import React from "react";
import styles from  "./Content.module.css";
import Dashboard from "../../Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Course from "../../Course/Course";
import Analytic from "../../Analytic/Analytic";
import CreateCourse from "../../CreateCourse/CreateCourse";
import Earning from "../../Earning/Earning";
import Payout from "../../Payout/Payout";
import EditCourse from "../../EditCourse/EditCourse";
import Comment from "../../Comment/Comment";
import CreateNewCourse from "../../CreateNewCourse/CreateNewCourse";

function Content(props) {
  return (
    <div className={styles.content}>    
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="course/*" element={<Course/>}/>
        <Route path="course/edit/:id" element={<EditCourse/>}/>
        <Route path="analytic/*" element={<Analytic/>}/>
        <Route path="createNewCourse/*" element={<CreateNewCourse/>}/>
        <Route path="earning/*" element={<Earning/>}/>
        <Route path="payout/*" element={<Payout/>}/>
        <Route path="comment/*" element={<Comment/>}/>
      </Routes>
        
    </div>
  );
}

export default Content;
