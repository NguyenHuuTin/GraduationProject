import axios from "axios";
import React, { useState } from "react";
import styles from "./CreateCourse.module.css";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import View from "./View/View";
import CourseContent from "./CourseContent/CourseContent";
import Finished from "./Finished/Finished";

function CreateCourse(props) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTile] = useState("");
  const [language, setLanguage] = useState("");
  const [subCate, setSubCate] = useState("");
  const [price, setPrice] = useState(0);
  const [backGround, setBackGround] = useState();
  const [courseID, setCourseID] = useState("")
  const [status, setStatus] = useState(0);
  const handleStatus = (e)=>{
    setStatus(e);
  }

  const handleData = (title, subTitle, description, language, subCate, price)=>{
    setTitle(title);
    setSubTile(subTitle);
    setLanguage(language);
    setSubCate(subCate);
    setPrice(price);
    setDescription(description);
  }

  const handleCreateInfoCourse = async (backGround)=>{
    setBackGround(backGround);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('languageId', language);
    formData.append('subCategoryId', subCate);
    formData.append('price', price);
    formData.append('backgroupCourse', backGround);
    const token = localStorage.token;
    console.log(token);
    if(token){
      await axios.post('http://localhost:57678/Courses/Information', formData,{
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log(res.data)
      setCourseID(res.data)
      setStatus(2)
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }
  console.log(status)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-circle-plus"></i>
        </div>
        <div className={styles.textTitle}>Create New Course</div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={styles.stepStatusHidden}></div>
            <div className={styles.stepPointActive}></div>
            <div className={status >= 1 ? styles.stepStatusActive : styles.stepStatus}></div>
          </div>
          <div className={styles.stepTitle}>GENERAL INFORMATION</div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={status >= 2 ? styles.stepStatusActive : styles.stepStatus}></div>
            <div className={status >= 2 ? styles.stepPointActive : styles.stepPoint}></div>
            <div className={status >= 2 ? styles.stepStatusActive : styles.stepStatus}></div>
          </div>
          <div className={styles.stepTitle}>VIEW</div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={status >= 3 ? styles.stepStatusActive : styles.stepStatus}></div>
            <div className={status >= 3 ? styles.stepPointActive : styles.stepPoint}></div>
            <div className={status >= 3 ? styles.stepStatusActive : styles.stepStatus}></div>
          </div>
          <div className={styles.stepTitle}>COURSE CONTENT</div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={status >= 4 ? styles.stepStatusActive : styles.stepStatus}></div>
            <div className={status >= 4 ? styles.stepPointActive : styles.stepPoint}></div>
            <div className={styles.stepStatusHidden}></div>
          </div>
          <div className={styles.stepTitle}>FINISHED</div>
        </div>
      </div>
      <div className={styles.content}>
        {
          status === 0 ? <GeneralInfo handleStatus={handleStatus} handleData={handleData}/>
          : status ===1 ? <View handleStatus={handleStatus} handleCreateInfoCourse={handleCreateInfoCourse}/>
          : status === 2 || status === 3 ? <CourseContent handleStatus={handleStatus} courseID={courseID}/>
          : <Finished/>
        }
      </div>
    </div>
  );
}

export default CreateCourse;
