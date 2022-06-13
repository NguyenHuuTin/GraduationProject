import React from "react";
import styles from  "./Content.module.css";
import { Route, Routes } from "react-router-dom";
import Home from "../../Home/Home";
import {SliderData } from "../../Home/SlideData";
import ViewCourse from "../../ViewCourse/ViewCourse";
import ListInstructor from "../../ListInstructor/ListInstructor";
import ViewInstructor from "../../ViewInstructor/ViewInstructor";
import MyCourse from "../../MyCourse/MyCourse";
import ViewMyCourse from "../../ViewMyCourse/ViewMyCourse";

function Content(props) {
  return (
    <div className={styles.content}>    
    <Routes>
      <Route index element={<Home slides={SliderData}/>}/>
      <Route path="/instructorList/*" element={<ListInstructor/>}/>
      <Route path="/instructorList/:id" element={<ViewInstructor/>}/>
      <Route path="/course/:id" element={<ViewCourse/>}/>
      <Route path="/myCourse/*" element={<MyCourse/>}/>
      <Route path="/myCourse/:id" element={<ViewMyCourse/>}/>
    </Routes>
    </div>
  );
}

export default Content;
